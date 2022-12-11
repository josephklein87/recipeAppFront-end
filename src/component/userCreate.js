  
  import {useState, useEffect} from 'react';
  import axios from 'axios';
  import '../App.css';
  
  const UserName = (props) => {
  
  const [createUser, setCreateUser] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [button, setButton] = useState(false)
  const [error, setError] = useState("")

  const handleNewUsernameChange = (e) => {
    setCreateUser(e.target.value)
  }

  const usernameAvailabilityCheck = (e)=> {
    axios
      .get("http://localhost:3000/user/userList")
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

  const handleNewPasswordChange = (e) => {
    setCreatePassword(e.target.value)
  }

  const handleUserCreate = (e) => {
    e.preventDefault();
    console.log(createUser)
    console.log(createPassword)
    axios.post(
      'http://localhost:3000/user/newUser',
      {
        username: createUser,
        password: createPassword
      }
    ).then((res)=>{
      console.log(res.data)
    })
  }

  const closeModal = () => {
    props.setShowSignUp(false)
  }


  return (
    <div className="create-acc-main-container">
      <div className='create-acc-div'>
        <button className='btn btn-danger close-modal' onClick={closeModal}>x</button>
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
    </div>
  )
}




export default UserName
