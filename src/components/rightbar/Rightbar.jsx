import "./rightbar.css"
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from "react";
import axios from "../../axios-users";
import { updateObject } from "../../shared/utility"
import { Link } from "react-router-dom";
import Suggestion from "../suggestion/Suggestion";


export default function Rightbar() {
    const [friends, setfriends] = useState(null)
    const [suggestions, setsuggestions] = useState(null)
    const [showSuggestions, setshowSuggestions] = useState({
        type: true,
        data: null
    })
    const [showFriends, setshowFriends] = useState({
        type: true,
        data: null
    })
    useEffect(() => {
        axios.get("/friends/all").then(data => {
            // console.log(data)
            if (friends === null) {
                const updatedFriends = updateObject(friends, data.data)
                setfriends(updatedFriends)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [friends])

    let friendList = [];
    for (let key in friends) {
        friendList.push({
            name: friends[key][0].name,
            id: friends[key][0]._id,
            profilePicture: friends[key][0].profilePicture,
            email: friends[key][0].email
        });
    }
    let friend = friendList.map((e) => (<div className="suggestionUser" key={e.id}><img src={e.profilePicture} /> <Link className="Link" to={`/userprofile/${e.id}`} key={e.id}>{e.name}</Link></div>))
    // suggestions logic  
    useEffect(() => {
        axios.get("/suggestions/all").then(data => {
            if (suggestions === null) {
                setsuggestions(data.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [suggestions])

    let suggestedFriends = [];
    for (let key in suggestions) {
        suggestedFriends.push({
            name: suggestions[key][0].name,
            id: suggestions[key][0]._id,
            profilePicture: suggestions[key][0].profilePicture,
            email: suggestions[key][0].email
        });
    }
    let suggestedFriend = suggestedFriends.map((e, i) => (
        <Suggestion suggestedUser={e} key={i} />
    ))
    const filterOnChangeFriends = (event) => {
        if (event.target.value) {
            setshowFriends({
                type: false,
                data: false
            })
            const searchedFriend = friendList.find((e) => e.name?.toLowerCase() == event.target.value || e.email?.toLowerCase() == event.target.value)
            console.log(searchedFriend)
            setshowFriends((p) => ({ ...p, data: searchedFriend ? searchedFriend : "no user found" }))
        } else {
            setshowFriends({
                type: true,
                data: false
            })
        }
    }
    const filterOnChangeSuggestion = (event) => {
        if (event.target.value) {
            setshowSuggestions({
                type: false,
                data: false
            })
            const searchedSuggestedFriend = suggestedFriends.find((e) => e.name?.toLowerCase() == event.target.value || e.email?.toLowerCase() == event.target.value)
            console.log(searchedSuggestedFriend)
            setshowSuggestions((p) => ({ ...p, data: searchedSuggestedFriend ? searchedSuggestedFriend : "no user found" }))
        } else {
            setshowSuggestions({
                type: true,
                data: false
            })
        }

    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <ul className="friendList">
                    <span className="friendListItem"><h5>Friends</h5>
                        <input type="text" placeholder="Search..." onChange={filterOnChangeFriends} />
                        <label htmlFor="search"><SearchIcon className="rightbarIcon" /></label>
                    </span>
                    {showFriends.type ? friend : <div className="friendUser" key={showFriends.data.id}><img src={showFriends.data.profilePicture} /> <Link className="Link" to={`/userprofile/${showFriends.data.id}`} key={showFriends.data.id}>{showFriends.data.name}</Link></div>}
                </ul>
                <ul className="suggestionList">
                    <span className="suggestionListItem"> <h5>Suggestions</h5>
                        <input type="text" placeholder="Search..." onChange={filterOnChangeSuggestion} />
                        <label htmlFor="search"><SearchIcon className="rightbarIcon" /></label>
                    </span>
                    {showSuggestions.type ? suggestedFriend : <Suggestion suggestedUser={showSuggestions.data} />}


                </ul>
            </div>
        </div>
    )
}
