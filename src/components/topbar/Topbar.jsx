import "./topbar.css"
import { Person, Chat, Notifications } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notification from "../notification/Notification";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const Topbar = (props) => {
    const [ids, setids] = useState([])
    console.log(props.user)

    useEffect(() => {
        setids(props.user?.friendRequests?.incoming)        
    }, [props.user])

   let friendRequests = ids?.map((e, i) => (<Notification key={i} userId={e} />))

    //send friend request array on map to notification as props and there find that user
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">
                    <a href="/"> Buzz App</a>
                </span>     
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person /><a href="/editprofile">{props.user && props.user.name || "user"}</a>
                    </div>

                    <div className="topbarIconItem">
                        <div className="dropdown">
                            <Notifications className="dropbtn" />
                            <div className="dropdown-content">
                                {friendRequests}
                            </div>
                        </div>
                        <span className="topbarIconBadge">{props.user && props.user?.friendRequests?.incoming.length || ""}</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                    </div>
                    <div className="topbarIconItem">
                        <a href="http://localhost:5500/logout">
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