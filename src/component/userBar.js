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


    return (
        <div className='user-header'>

            <button className="btn btn-secondary create-acc-btn" onClick={toggleUserSignup}>create an account</button>
            <button className ="btn btn-secondary login-btn" onClick={toggleUserLogin}>log in</button>

        </div>
    )

}

export default UserBar