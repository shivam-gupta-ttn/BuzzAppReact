import "./topbar.css"
import { Person, Chat, Notifications } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notification from "./notification/Notification";
import logo from "../../assets/tothenew.png"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
const Topbar = (props) => {
    const [showNotification, setshowNotification] = useState(false)
    const [ids, setids] = useState([])
    console.log(props.user)

    useEffect(() => {
        setids(props.user?.friendRequests?.incoming)

    }, [props.user, showNotification])

    const onNotificationClickHandler = () => {
        setshowNotification(!showNotification)
    }

    let friendRequests = ids?.map((e, i) => (<Notification key={i} userId={e} onResponse={setshowNotification} />))
    console.log(showNotification)
    const dropdown = showNotification ? <div className="dropdown-content">
        {friendRequests}
    </div> : null
    //send friend request array on map to notification as props and there find that user
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">
                    <Link to="/">
                        <img src={logo} alt="Buzz App" />
                    </Link>
                </span>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <img src={props.user && props.user.profilePicture} /><Link to="/editprofile">{props.user && props.user.name || "user"}</Link>
                    </div>

                    <div className="topbarIconItem">
                        <div className="dropdown">
                            <Notifications className="dropbtn" onClick={onNotificationClickHandler} />
                            {dropdown}
                        </div>
                        <span className="topbarIconBadge">{props.user && props.user?.friendRequests?.incoming.length || ""}</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                    </div>
                    <div className="topbarIconItem">
                        <a href="http://localhost:5500/logout" className="tobarIconItemLogout">
                            <ExitToAppIcon /> <span>Logout</span>
                        </a>
                    </div>
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
export default connect(mapStateToProps)(Topbar)