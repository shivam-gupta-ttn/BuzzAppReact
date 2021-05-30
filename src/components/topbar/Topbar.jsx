import "./topbar.css"
import { Person, Chat, Notifications } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notification from "../notification/Notification";

export default function Topbar({ data }) {
    console.log(data)
    let friendRequests = data?.friendRequests?.incoming?.map((e, i) => (<Notification key={i} data={e} />))
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
                        <Person /><a href="/editprofile">{data && data.name || "user"}</a>
                    </div>

                    <div className="topbarIconItem">
                        <div className="dropdown">
                            <Notifications className="dropbtn" />
                            <div className="dropdown-content">
                                {friendRequests}
                            </div>
                        </div>
                        <span className="topbarIconBadge">{data && data.friendRequests.incoming.length || ""}</span>
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