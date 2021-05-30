import React, { useState } from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from "../../components/topbar/Topbar"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import "./editProfile.css"
import axios from '../../axios-users';

export default function EditProfile({ userdata }) {
    console.log(userdata) 
    const [editUser, seteditUser] = useState({
        fname: "",
        lname:"",
        designation: "",
        website: "",
        gender: "",
        city: "",
        state: "",
        pin: "",
        profilePicture:"",
        birthday:""
    })

    const onChangeHandler = (e,event) =>{
        seteditUser({...editUser,[event]:e.target.value})
        console.log(editUser)
    }
    const onSubmitHandler = (event)=>{
        event.preventDefault();
        axios.put(`/${userdata._id}`,editUser).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <>
            <Topbar data={userdata} />
            <div className="editProfile">
                <div className="editProfileWrapper">
                    <div className="editProfileBanner">
                    </div>

                    <div className="editProfileInfo">
                        <img src={userdata && userdata.profilePicture || ""} alt="" />
                        <AddAPhotoIcon className="editProfileInfoIcon"/>
                        <h2>{userdata && userdata.name || "user"}</h2>
                    </div>

                    <div className="userForm">
                        <form onSubmit={onSubmitHandler} className="userFormInfo">
                            <div className="formFormat">
                                <label htmlFor="fnam">First Name</label>
                                <input type="text" placeholder="First Name" name="fnam" onChange={(e)=>onChangeHandler(e,"fname")}/>
                                <label htmlFor="lnam">Last Name</label>
                                <input type="text" placeholder="Last Name" name="lnam" onChange={(e)=>onChangeHandler(e,"lname")}/>
                            </div>
                            <div className="formFormat">
                                <label htmlFor="designation">Designation</label>
                                <input type="text" placeholder="Designation" name="designation" onChange={(e)=>onChangeHandler(e,"designation")}/>
                                <label htmlFor="website">My Website</label>
                                <input type="text" placeholder="website" name="website" onChange={(e)=>onChangeHandler(e,"website")}/>
                            </div>
                            <div className="formFormat">
                                <div className='user-gender'>
                                    <label htmlFor='gender-female'>Gender</label>
                                    <div className='radio-container'>
                                        <input id='gender-female' name='gender' type='radio' value='female' onChange={(e)=>onChangeHandler(e,"gender")}/>
                                        <label htmlFor='gender-female'>Female</label>
                                        <input id='gender-male' name='gender' type='radio' value='male' onChange={(e)=>onChangeHandler(e,"gender")}/>
                                        <label htmlFor='gender-male'>Male</label>
                                    </div>
                                </div>

                                <label htmlFor="birthday">Birthday</label>
                                <input type="date" placeholder="birthday" name="birthday" onChange={(e)=>onChangeHandler(e,"birthday")}/>
                            </div>
                            <div className="formFormat">
                                <label htmlFor="city">City</label>
                                <input type="text" placeholder="city" name="city" onChange={(e)=>onChangeHandler(e,"city")}/>
                                <label htmlFor="state">State</label>
                                <input type="text" placeholder="state" name="state" onChange={(e)=>onChangeHandler(e,"state")}/>
                                <label htmlFor="zip">Zip</label>
                                <input type="number" placeholder="zip" name="zip" onChange={(e)=>onChangeHandler(e,"pin")}/>
                            </div>
                            <div className="formFormat">
                            <button type="submit" className="editProfileButton">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="suggestions">
                    <Rightbar />

                </div>
            </div>
        </>
    )
}
