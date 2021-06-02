import Share from "../share/Share"
import "./feed.css"
import React, { useEffect, useState, Suspense, useContext } from "react";
import axios from "../../axios-posts";
import axiosUser from "../../axios-users";
import AdminPost from "../adminPost/AdminPost";
import { connect } from "react-redux";

const Post = React.lazy(() => import("../post/Post"))

const Feed = (props) => {

    const [posts, setposts] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [verify, setverify] = useState(false)
    const [page, setPage] = useState(1);
    const [isAdmin, setisAdmin] = useState(false)
    const [adminView, setadminView] = useState(false)
    const [verifyInput, setverifyInput] = useState({
        password: ""
    })

    useEffect(() => {
        fetchData();
        window.addEventListener('scroll', handleScroll);
        return () => {
            setposts([])
            setIsFetching(false)
            setPage(1)
        }
    }, [])

    const handleScroll = () => {
        if (
            Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
            isFetching
        ) {

            return;
        }
        setIsFetching(true);
        console.log(isFetching);
    };

    const fetchData = async () => {
        axios.get(`/post/all?page=${page}`).then(res => {
            console.log(res)
            setPage(page + 1)
            setposts(() => {
                return [...posts, ...res.data]
            })
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    const fetchMoreListItems = () => {
        fetchData();
        setIsFetching(false);
    };
    useEffect(() => {
        if (props.user?.role === "admin")
            setisAdmin(true)
    }, [props.user])

    let post =
        posts?.map((e, i) => (
            <Suspense key={i} fallback="loading...">
                <Post key={i} data={e} />
            </Suspense>
        ))


    let adminPost = posts?.map((e, i) => (
        <Suspense key={i} fallback="loading...">
            <AdminPost key={i} data={e} />
        </Suspense>
    ));
    const onVerifyClickHandler = () => {
        setverify(!verify)
    }
    const onCheckVerifyHandler = () => {
        axiosUser.put("/verify/user", verifyInput).then(res => {
            console.log(res)
            setverifyInput({password:""})
            setverify(false)

        }).catch(err => {
            console.log(err)
        })
    }
    const onVerifyInputChangeHandler = (event) => {
        console.log(verifyInput)
        setverifyInput(prevState => ({ ...prevState, ["password"]: event.target.value }))
    }
    const verifyCard = verify ? <div className="verifyCard">
        <p>Verify your self as admin</p>
        <p>Enter Password </p>
        <input type="password" onChange={onVerifyInputChangeHandler} />
        <button className="verifyButton" onClick={onCheckVerifyHandler}>Verify</button>
    </div> : null

    const admin = isAdmin ? <div className="switchWrapper"><label className="switch"><input type="checkbox" onClick={() => (setadminView((p) => !p))} /><span className="slider round">Admin</span></label> </div> :
        <div className="switchWrapper"><label className="switch"><input type="checkbox" onClick={onVerifyClickHandler} /><span className="slider round">Verify</span></label> </div>

    return (
        <div className="feed">
            <div className="feedWrapper">
                {admin}
                {verifyCard}
                <Share data={props.user} />

                <div className="postFeeddWrapper">

                    {adminView && isAdmin ? adminPost : post}
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = state => {
    return {
        user: state.user.user,
        loading: state.user.loading,
    };
};
export default connect(mapStateToProps)(Feed)
