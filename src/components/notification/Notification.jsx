import axios from "../../axios-users"
import { useEffect, useState } from "react"
import "./notification.css"

export default function Notification({data}) {
    const [notificationUser, setnotificationUser] = useState({
        name:"",
    })
    useEffect(() => {
            axios.get(`/${data}`).then(data=>{
                setnotificationUser({
                    name:data.data.name
                })
            }).catch(err=>{
                console.log(err)
            })
    }, [])
    const onAcceptHandler = ()=>{
        axios.put(`/${data}/accept`).then(res=>{
            console.log(res) 
        }).catch(err=>{
            console.log(err)
        })
    }
    const onRejectHandler = ()=>{
        axios.put(`/${data}/reject`).then(res=>{
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
