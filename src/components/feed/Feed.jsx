import Share from "../share/Share"
import "./feed.css"
import React, { useEffect, useState, Suspense, useContext } from "react";
import axios from "../../axios-posts";
import AdminPost from "../adminPost/AdminPost";
import { connect } from "react-redux";

const Post = React.lazy(() => import("../post/Post"))

const Feed=(props) =>{

    const [posts, setposts] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [updatedPost, setupdatedPost] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [adminView, setadminView] = useState(false)

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
        setisAdmin(props.user?.isAdmin)

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
    ))



    return (
        <div className="feed">
            <div className="feedWrapper">
                <div className="switchWrapper">
                    <label className="switch">
                        <input type="checkbox" disabled={!isAdmin} onClick={() => (setadminView((p) => !p))} />
                        <span className="slider round">Admin</span>
                    </label>
                </div>
                <Share data={props.user}/>

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
