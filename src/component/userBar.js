import {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';
  
const UserBar = (props) => {

    const toggleUserSignup = () => {
        props.setShowSignUp(!props.showSignUp)
        if (props.showLogin === true) {
            props.setShowLogin(false)
        }
    }


    const toggleUserLogin = () => {
        props.setShowLogin(!props.showLogin)
        if (props.showSignUp === true) {
            props.setShowSignUp(false)
        }
    }

    const handleLogOut = () => {
        props.setUser({})
    }


    return (
        <div className='user-header'>
            <h1 className='site-header'>Yes, Chef!</h1>

            {(props.user.username) ? 
                <div className='user-header'>
                    <p>logged in: {props.user.username}</p>
                    <button className='btn btn-danger logout-btn' onClick={handleLogOut}>logout</button>
                </div>
            :
            <div className='user-header'>
                <button className="btn btn-secondary create-acc-btn" onClick={toggleUserSignup}>create an account</button>
                <button className ="btn btn-secondary login-btn" onClick={toggleUserLogin}>log in</button>
                </div>
            }
        </div>
    )

}

export default UserBar