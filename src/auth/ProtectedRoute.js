import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router';
import axios from '../axios-users';
import Spinner from '../components/UI/spinner/Spinner';


function ProtectedRoute({ component: Component, ...rest }) {
    const [isAuthenticated, setisAuthenticated] = useState(null)
    useEffect(() => {

        axios.get("http://localhost:5500/api/auth/check").then(data => {
            if (data.status === 200) {
                // console.log(data)
                setisAuthenticated(true)
            } else {
                setisAuthenticated(false)
            }
        }).catch(err => {
            setisAuthenticated(false)
        })
        return () => {
            console.log("...")
        }
    }, [])
    if (isAuthenticated === null) {
        return <Spinner />;
    }
    console.log("protected")
    return (
        <Route {...rest} render={props => isAuthenticated ? (
            <Component {...props} />
        ) : <Redirect to="/login" />} />
    )
}

export default ProtectedRoute
