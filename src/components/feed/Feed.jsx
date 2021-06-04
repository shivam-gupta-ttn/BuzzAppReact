import Share from "../share/Share"
import "./feed.css"
import React, { useEffect, useState, Suspense, useContext } from "react";
import axios from "../../axios-posts";
import axiosUser from "../../axios-users";
import AdminPost from "../adminPost/AdminPost";
import { connect } from "react-redux";
import Spinner from "../UI/spinner/Spinner";

const Post = React.lazy(() => import("../post/Post"))

const Feed = (props) => {

    const [posts, setposts] = useState([])
    const [adminPosts, setadminPosts] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [verify, setverify] = useState(false)
    const [page, setPage] = useState(1);
    const [adminPage, setadminPage] = useState(1)
    const [isAdmin, setisAdmin] = useState(false)
    const [adminView, setadminView] = useState(false)
    const [postLoader, setpostLoader] = useState(false)
    const [updatedPost, setupdatedPost] = useState(false)
    const [verifyInput, setverifyInput] = useState({
        password: ""
    })

    useEffect(() => {
        setpostLoader(true)
        console.log("this updated post", updatedPost)
        fetchData();
        window.addEventListener('scroll', handleScroll);
        return () => {
            setposts([])
            setIsFetching(false)
            setPage(1)
            setadminPage(1)
            setadminPosts([])
            setpostLoader(false)
            setupdatedPost(false)
        }
    }, [updatedPost])

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
            setpostLoader(false)
            setPage(page + 1)
            setposts(() => {
                return [...posts, ...res.data]
            })
            setupdatedPost(false)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    // useEffect(() => {
    //     if(!updatedPost) return;
    //     setPage(1)
    //     setupdatedPost(false)
    //     fetchData(); 
    // }, [updatedPost])

    const fetchMoreListItems = () => {
        setpostLoader(true)
        console.log("admin view", adminView)
        if (adminView) {
            getFlaggedPost();
        } else {
            fetchData();
        }
        setIsFetching(false);
    };
    useEffect(() => {
        if (props.user?.role === "admin") setisAdmin(true)
    }, [props.user])

    const adminViewHandler = () => {
        setadminView(!adminView)
        console.log(adminPage)
        getFlaggedPost();

    }
    const getFlaggedPost = async () => {
        console.log("reach here", adminPage)
        axios.get(`/posts/flagged?adminPage=${adminPage}`).then(res => {
            setpostLoader(false)
            console.log("flagged postss", res.data)
            setadminPosts(() => { return [...adminPosts, ...res.data] })
            setadminPage(adminPage + 1)
            setupdatedPost(false)
        }).catch(err => {
            console.log(err)
        })
    }

    let post =
        posts?.map((e, i) => (
            <Suspense key={i} fallback="">
                <Post key={i} data={e} updatedPost={setupdatedPost} />
            </Suspense>
        ))


    let adminPost = adminPosts?.map((e, i) => (
        <Suspense key={i} fallback="">
            <AdminPost key={i} data={e} updatedPost={setupdatedPost} />
        </Suspense>
    ));

    const onVerifyClickHandler = () => {
        setverify(!verify)
    }
    const onCheckVerifyHandler = () => {
        axiosUser.put("/verify/user", verifyInput).then(res => {
            console.log(res)
            setverifyInput({ password: "" })
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

    const admin = isAdmin ? <div className="switchWrapper"><label className="switch"><input type="checkbox" onClick={adminViewHandler} /><span className="slider round">Admin</span></label> </div> :
        <div className="switchWrapper"><label className="switch"><input type="checkbox" onClick={onVerifyClickHandler} /><span className="slider round">Verify</span></label> </div>


    const loader = postLoader ? <Spinner /> : null

    return (
        <div className="feed">
            <div className="feedWrapper">
                {admin}
                {verifyCard}
                <Share data={props.user} updatedPost={setupdatedPost} />

                <div className="postFeeddWrapper">
                    {loader}
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
