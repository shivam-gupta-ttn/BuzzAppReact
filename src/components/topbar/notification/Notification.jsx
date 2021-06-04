import axios from "../../../axios-users"
import { useEffect, useState } from "react"
import "./notification.css"
import Spinner from "../../UI/spinner/Spinner"

export default function Notification(props) {
    const [notificationUser, setnotificationUser] = useState({
        name: "",
    })
    const [accepted, setaccepted] = useState(false)
    const [rejected, setrejected] = useState(false)
    console.log(props)

    useEffect(() => {
        axios.get(`/${props.userId}`).then(data => {
            setnotificationUser({
                name: data.data.name
            })
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const onAcceptHandler = () => {
        setaccepted(true)
        axios.put(`/${props.userId}/accept`).then(res => {
            setaccepted(false)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    const accept = accepted? <div className="accepted"><Spinner/>Friend Request Accepted</div> : null

    const onRejectHandler = () => {
        setrejected(true)
        axios.put(`/${props.userId}/reject`).then(res => {
            setrejected(false)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    const reject = rejected? <div className="rejeted"><Spinner/>Friend Request Rejected</div> : null

    //get user on useEffect
    //perform accept reject functionalities
    return (
        <>
            <div className="notificationWrapper">
                <p className="ptag">{notificationUser.name} sent you a friend request</p>
                {accept}
                {reject}
                <div className="notificationIcon">
                    <button className="accept" onClick={onAcceptHandler}>accept</button>
                    <button className="reject" onClick={onRejectHandler}>reject</button>
                </div>
            </div>

        </>
    )
}
