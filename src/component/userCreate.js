  
  import {useState, useEffect} from 'react';
  import axios from 'axios';
  import '../App.css';
  
  const UserName = (props) => {

  //states for user creation
  
  const [createUser, setCreateUser] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [button, setButton] = useState(false)
  const [error, setError] = useState("")
  const [accountCreated, setAccountCreated] = useState(false)


  //sets the value of the username creation state

  const handleNewUsernameChange = (e) => {
    setCreateUser(e.target.value)
  }

  //sets the value of the password creation state

 const handleNewPasswordChange = (e) => {
    setCreatePassword(e.target.value)
  }

  //closes the modal for the user create form
 const closeModal = () => {
    props.setShowSignUp(false)
    setAccountCreated(false)
  }


//reveals the login form after successful account creation
  const revealLogin = () => {
    props.setShowLogin(true)
  }


  //creates the user in the database with an axios request
const handleUserCreate = (e) => {
    e.preventDefault();
    let userObj = {
      username: createUser,
      password: createPassword
    }
    setCreateUser("")
    setCreatePassword("")
    axios.post(
      'https://polar-forest-73812.herokuapp.com/user/newUser',
      userObj
    ).then((res)=>{
      console.log(res.data)
      setAccountCreated(true)
    })
  }


// function to check the username's availability against the database

  const usernameAvailabilityCheck = (e)=> {
    axios
      .get("https://polar-forest-73812.herokuapp.com/user/userList")
      .then((res)=>{
        console.log(res)
      for (let i=0; i < res.data.length; i++) {
         console.log(res.data[i].username)
       if (res.data[i].username === e.target.value) {
        setButton(true)
        setError("This username is not available!")
        return
       } else {
        setButton(false)
        setError("")
       }
  }})
  }

 
  

  return (
    <div className="create-acc-main-container">
      <div className='create-acc-div'>
        <button className='btn btn-danger close-modal' onClick={closeModal}>x</button>
        {(accountCreated) ? 
          <div>
            <p className='account-creation-message'>Your account has been created.</p>
            <button className='btn btn-primary' onClick={()=>{closeModal();revealLogin()}}>login</button>
          </div>
        :
        <div>
          <h1 className="create-acc-header">create account</h1>
          <form className='form-group' onSubmit={handleUserCreate}>
            <p>username:</p>
            <input className="form-control" type="text" name="user" onChange={handleNewUsernameChange} onKeyUp={usernameAvailabilityCheck}/><br/>
            <p>password:</p>
            <input className="form-control" type="password" name="password" onChange={handleNewPasswordChange} /><br/>
            <p className='error-message'>{error}</p>
          {(button) ? <input className='btn btn-primary' type="submit" value="submit" disabled/> : <input className='btn btn-primary' type="submit" value="submit" />}
          </form>
        </div>

        }
      </div>
    </div>
  )
}




export default UserName
