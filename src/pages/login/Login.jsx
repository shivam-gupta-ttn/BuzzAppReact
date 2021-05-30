import React from 'react'
import "./login.css"

export default function Login() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3>Login with Google</h3>
                    <a href="http://localhost:5500/auth/google">login</a>
                </div>
                <div className="loginRight">
                    <h3>Login using email and password</h3>
                    <label htmlFor="email">Email</label>
                    <input type="email" />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" />
                </div>
            </div>

        </div>
    )
}
