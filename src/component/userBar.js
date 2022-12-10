import {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';
  
const UserBar = (props) => {

    const toggleUserSignup = () => {
        props.setShowSignUp(!props.showSignUp)
    }


    const toggleUserLogin = () => {
        props.setShowLogin(!props.showLogin)
    }


    return (
        <div className='user-header'>

            <button onClick={toggleUserSignup}>create an account</button>
            <button onClick={toggleUserLogin}>log in</button>

        </div>

    )

}

export default UserBar