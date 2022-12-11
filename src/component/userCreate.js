  
  import {useState, useEffect} from 'react';
  import axios from 'axios';
  import '../App.css';
  
  const UserName = (props) => {
  
  const [createUser, setCreateUser] = useState('')
  const [createPassword, setCreatePassword] = useState('')

  const handleNewUsernameChange = (e) => {
    setCreateUser(e.target.value)
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
        <h1>create account</h1>
        <form onSubmit={handleUserCreate}>
        username<input type="text" name="user" onChange={handleNewUsernameChange}/><br/>
        password<input type="text" password="password" onChange={handleNewPasswordChange} /><br/>
        <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  )
}




export default UserName
