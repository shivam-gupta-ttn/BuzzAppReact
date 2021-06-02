import axios from "../../axios-users"
import { useEffect, useState } from "react"
import "./notification.css"

export default function Notification(props) {
    const [notificationUser, setnotificationUser] = useState({
        name:"",
    })
    console.log(props)
    useEffect(() => {
            axios.get(`/${props.userId}`).then(data=>{
                setnotificationUser({
                    name:data.data.name
                })
            }).catch(err=>{
                console.log(err)
            })
    }, [])
    const onAcceptHandler = ()=>{
        axios.put(`/${props.userId}/accept`).then(res=>{
            console.log(res) 
        }).catch(err=>{
            console.log(err)
        })
    }
    const onRejectHandler = ()=>{
        axios.put(`/${props.userId}/reject`).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    //get user on useEffect
    //perform accept reject functionalities
    return (
        <>
            <p>{notificationUser.name} sent you a friend request</p>
            <button onClick={onAcceptHandler}>accept</button>
            <button onClick={onRejectHandler}>reject</button>
        </>
    )
}
