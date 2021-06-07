import React from 'react'
import "./login.css"
import logo from "../../assets/tothenew.png"

export default function Login() {

    return (
        
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3>Login with Google</h3>
                    <h4>Use tothenew Id to Login</h4>
                    <img className="loginImg" src={logo} alt="" /> <br />
                    <a href="http://localhost:5500/auth/google"><button className="loginButton">
                        login
                        </button></a>
                </div>
                <div className="loginRight">
                    <h3>Login to your Account</h3>
                    <input type="email" placeholder="TTN Email" />
                    <br />
                    <input type="password" placeholder="Password" />
                    <br />
                    <button className="loginButton">login</button>
                </div>
            </div>

        </div>
    )
}
