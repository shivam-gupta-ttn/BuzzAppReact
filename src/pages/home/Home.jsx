import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar"
import "./home.css"
import axios from "../../axios-users";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import React, { useEffect } from "react";


const Home = props => {
    console.log(props)
    // const {onFetchUser} = props;

    // useEffect(()=>{
    //     console.log(props)
    //     onFetchUser();

    // },[onFetchUser])

    return (
        <>
            <Topbar data={props.userdata} />

            <div className="homeContainer">
                <Leftbar data={props.userdata} />
                <Feed data={props.userdata} />
                <Rightbar />

            </div>
        </>
    )
}
// const mapStateToProps = state => {
//     return {
//         user: state.user.user,
//         loading: state.user.loading,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onFetchUser: () => dispatch(actions.fetchUser())
//     };
// };

export default Home