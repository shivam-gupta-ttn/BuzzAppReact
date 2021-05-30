import "./leftbar.css";
import { ExpandMore, Bookmark, Chat, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline, Event } from "@material-ui/icons";


export default function Leftbar({ data }) {
    // console.log("leftbar",data)
    return (
        <div className="leftbar">
            <div className="leftbarWrapper">
                <div className="leftbarCard">
                    <div className="banner">
                    </div>
                    <ul className="profileInfo">
                        <li className="profileInfoItem">
                            <img src={data && data.profilePicture || ""} alt="" />
                        </li>
                        <li className="profileInfoItem">
                            {data && data.name || "user"}
                        </li>
                        <li className="profileInfoItem">
                            <p>Designation : {data && data.designation || ""}</p>
                        </li>

                    </ul>
                    <ul className="userInfo">
                        <li className="userInfoItem">
                            <h4>{data && data.friends?.length || ""}</h4>
                            <span>Friends</span>
                        </li>
                        <li className="userInfoItem">
                            <br></br>
                            <br></br>
                        </li>
                        <li className="userInfoItem">
                            <h4>2</h4>
                            <span>Posts</span>
                        </li>
                    </ul>
                </div>


                <div className="leftbarListWrapper">
                    <ul className="leftbarList">
                        <h4>Media</h4>
                        <li className="leftbarListItem">
                            <RssFeed className="leftbarIcon" />
                            <span className="leftbarListItemText">Feed</span>
                        </li>
                        <li className="leftbarListItem">
                            <Chat className="leftbarIcon" />
                            <span className="leftbarListItemText">Chats</span>
                        </li>
                        <li className="leftbarListItem">
                            <PlayCircleFilledOutlined className="leftbarIcon" />
                            <span className="leftbarListItemText">Videos</span>
                        </li>
                        <li className="leftbarListItem">
                            <ExpandMore className="leftbarIcon colored" />
                            <span className="leftbarListItemText colored">Show more</span>
                        </li>

                    </ul>
                    <ul className="leftbarList">
                        <h4>Related</h4>
                        <li className="leftbarListItem">
                            <Group className="leftbarIcon" />
                            <span className="leftbarListItemText">Groups</span>
                        </li>
                        <li className="leftbarListItem">
                            <Bookmark className="leftbarIcon" />
                            <span className="leftbarListItemText">Bookmarks</span>
                        </li>
                        <li className="leftbarListItem">
                            <HelpOutline className="leftbarIcon" />
                            <span className="leftbarListItemText">Questions</span>
                        </li>
                        <li className="leftbarListItem">
                            <ExpandMore className="leftbarIcon colored" />
                            <span className="leftbarListItemText colored">Show more</span>
                        </li>
                    </ul>
                    <ul className="leftbarList">
                        <h4>Find</h4>
                        <li className="leftbarListItem">
                            <WorkOutline className="leftbarIcon" />
                            <span className="leftbarListItemText">Jobs</span>
                        </li>
                        <li className="leftbarListItem">
                            <Event className="leftbarIcon" />
                            <span className="leftbarListItemText">Events</span>
                        </li>
                        <li className="leftbarListItem">
                            <School className="leftbarIcon" />
                            <span className="leftbarListItemText">Courses</span>
                        </li>
                        <li className="leftbarListItem">
                            <ExpandMore className="leftbarIcon colored" />
                            <span className="leftbarListItemText colored">Show more</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}