
  
import {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';
  
const UserLogin = (props) => {

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const handleNewLoginNameChange = (e) => {
        setLoginUsername(e.target.value)
      }
    
    const handleNewLoginPasswordChange = (e) => {
        setLoginPassword(e.target.value)
    }

    const loginUser = (e) => {
        console.log(loginUsername)
        console.log(loginPassword)
        e.preventDefault();
        axios
        .put("http://localhost:3000/user/userLogin",
        {
        username: loginUsername,
        password: loginPassword
        }
        )
        .then((res)=>{
            props.setUser(res.data)
        }

        )

    }


    return (
    <div>
    <h1>login to account</h1>
    <form onSubmit={loginUser}>
    username<input type="text" name="username" onChange={handleNewLoginNameChange}/><br/>
    password<input type="text" name="password" onChange={handleNewLoginPasswordChange} /><br/>
    <input type="submit" value="submit" />
    </form>
    </div>
    )
  }

export default UserLogin