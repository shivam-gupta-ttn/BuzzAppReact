import "./share.css"
import { PermMedia } from "@material-ui/icons"
import { useEffect, useState } from "react"
import axios from "../../axios-posts"
import axiosImg from "axios";

export default function Share({ data, postUpdate }) {
    const [loading, setloading] = useState(false)
    const [sharePost, setsharePost] = useState({
        desc: "",
        imgId: ""
    })
    const [shareImage, setshareImage] = useState("")

    const inputChangeHandler = (event) => {
        setsharePost(prevState => ({ ...prevState, ["desc"]: event.target.value }))
    }
    useEffect(() => {
        if (sharePost.imgId === "") return;
        axios.post(`/${data?._id}/post`, sharePost).then(res => {
            console.log(res)
            if (res.status == 200) {
                postUpdate();
                setsharePost({ desc: "", imgId: "" })
            }
        })
            .catch(err => {
                console.log(err)
            })

    }, [sharePost.imgId])

    const onSharePostHandler = async (event) => {
        event.preventDefault()
        if (shareImage == "" && sharePost.desc == "") return;
        if (shareImage == "") {
            axios.post(`/${data?._id}/post`, sharePost).then(res => {
                console.log(res)
                if (res.status == 200) {
                    postUpdate();
                    setsharePost({ desc: "", imgId: "" })
                }
            })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            const formData = new FormData()
            formData.append("file", shareImage);
            formData.append("upload_preset", "sxiwvrm4");
            await axiosImg.post("https://api.cloudinary.com/v1_1/drkob5xsz/image/upload", formData).then(res => {
                if (res.status == 200) {
                    setsharePost(prevState => ({ ...prevState, ["imgId"]: res.data.url }))
                    console.log("successfully uploaded")
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={data && data.profilePicture || ""} alt="" />
                    <input
                        placeholder={`What's in your mind ${data && data.name || "user"}?`}
                        className="shareInput"
                        value={sharePost.desc}
                        onChange={inputChangeHandler}
                        required
                    />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <label htmlFor="file-input">

                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText">Photo or Video</span>

                            </label>

                            <input type="file" name="" id="file-input" onChange={(event) => {
                                setshareImage(event.target.files[0]);
                            }} />
                        </div>
                    </div>
                    <button type="submit" className="shareButton" onClick={onSharePostHandler}>Share</button>
                </div>
            </div>

        </div>
    )
}
