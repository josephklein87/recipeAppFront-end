
  
import {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';
  
const UserLogin = (props) => {

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [error, setError] = useState('')

    const handleNewLoginNameChange = (e) => {
        setLoginUsername(e.target.value)
      }
    
    const handleNewLoginPasswordChange = (e) => {
        setLoginPassword(e.target.value)
    }

    const loginUser = (e) => {
        e.preventDefault();
        let userObj = {
          username: loginUsername,
          password: loginPassword
        }
        setLoginPassword("")
        setLoginUsername("")
        axios
        .put("https://polar-forest-73812.herokuapp.com/user/userLogin",
        {
        username: loginUsername,
        password: loginPassword
        }
        )
        .then((res)=>{
          if (res.data ==="There was an error.") {
            setError(res.data)
          } else if (res.data ==="User not found.") {
            setError(res.data)
          } else if (res.data ==="Passwords do not match.") {
            setError(res.data)
          } else {
            props.setUser(res.data)
            closeModal()
          }
        }
        )

    }
    const closeModal = () => {
      props.setShowLogin(false)
    }
  


    return (
      <div className="create-acc-main-container">
      <div className='create-acc-div'>
        <h1 className='create-acc-header'>login to account</h1>
        <form className="form-group" onSubmit={loginUser}>
        <button className='btn btn-danger close-modal' onClick={closeModal}>x</button>
        <p>username:</p> <input className='form-control' type="text" name="username" onChange={handleNewLoginNameChange}/><br/>
        <p>password:</p> <input className='form-control'type="password" name="password" onChange={handleNewLoginPasswordChange} /><br/>
        <p className='error-message'>{error}</p>
        <input className='btn btn-primary' type="submit" value="submit" />
      </form>
      </div>
      </div>
    )
  }

export default UserLogin