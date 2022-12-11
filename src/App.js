import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Recipe from './component/part.js';
import UserName from './component/userCreate';
import UserLogin from './component/userLogin';
import UserBar from './component/userBar';

function App() {

  // user states
  const [user, setUser] = useState({}) 

  //user login / user create modal states

  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)


  // recipe index states
  const [recipes, setRecipes] = useState([])
  const [newName, setNewName] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newTime, setNewTime] = useState(0)
  const [newVegetarian, setNewVegetarian] = useState(false)
  const [newSpicy, setNewSpicy] = useState(false)
  const [newNationality, setNewNationality] = useState("")
  const [newIngredient, setNewIngredient] = useState("")
  const [newLink, setNewLink] = useState("")
  const [newSearch, setNewSearch] = useState("")
  // const [filter, setFilter] =useState([])


  const handleNewNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNewLinkChange = (e) => {
    setNewLink(e.target.value)
  }

  const handleNewIngredientChange = (e) => {
    setNewIngredient(e.target.value)
  }
  const handleNewTimeChange = (e) => {
    setNewTime(e.target.value)
  }

  const handleNewImageChange = (e) => {
    setNewImage(e.target.value)
  }

  const handleNewSpicyChange = (e) => {
    setNewSpicy(e.target.checked)
  }

  const handleNewVegetarianChange = (e) => {
    setNewVegetarian(e.target.checked)
  }

  const handleNewNationalityChange = (e) => {
    setNewNationality(e.target.value)
  }

  const handleNewRecipeSubmit = (e) => {
    e.preventDefault();

    axios.post(
      'http://localhost:3000/recipe',
      {
        name: newName,
        image : newImage,
        timeToPrepare: newTime,
        mainIngredient: newIngredient,
        nationality: newNationality,
        link: newLink,
        vegetarian: newVegetarian,
        spicy: newSpicy
      }
    ).then(()=>{
      axios
        .get('http://localhost:3000/recipe')
        .then((res)=>{
          setRecipes(res.data)
        })
    })
    e.target.reset()
  }

  const handleNewSearch =(e)=>{
    setNewSearch(e.target.value)
  }

  const handleSearchRequest =(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/recipe/search',
    {
      search: newSearch
    }
  ).then((res)=>{
    setRecipes(res.data)
  })
  }

  const handleAllShow =(e)=>{
    e.preventDefault();
    axios.get('http://localhost:3000/recipe')
      .then((res)=>{
        setRecipes(res.data)
      })
  }

  useEffect(()=> {
    axios.get('http://localhost:3000/recipe')
    .then((res)=> {
      setRecipes(res.data)
    })
  }, [])



  return (
    <div>
      <UserBar setShowSignUp = {setShowSignUp} setShowLogin={setShowLogin} showSignUp= {showSignUp} showLogin={showLogin} user={user} setUser={setUser}/>
      {(showLogin) ? <UserLogin user={user} setUser={setUser} setShowLogin={setShowLogin}/> : null }
      {(showSignUp) ? <UserName user={user} setUser={setUser} setShowSignUp={setShowSignUp} setShowLogin = {setShowLogin} showLogin= {showLogin}/> : null }

      <div className="submit-form">

      <h1>YES, CHEF!</h1>
      <h2>a database of deliciousness</h2>
      <br/>
      <form onSubmit={handleNewRecipeSubmit}>
        <div className='form-row'>name: <br/><input className="form-control" type="text" placeholder='enter recipe name here' onChange={handleNewNameChange}/></div><br/>
        <div className='form-row'>image url: <br/><input className="form-control" type="text" placeholder='enter image url here' onChange={handleNewImageChange} /></div><br/>
        <div className='form-row'>time to prepare: <br/><input className="form-control" type="text" placeholder='enter time in minutes here' onChange={handleNewTimeChange} /></div><br/>
        <div className='form-row'>main ingredient: <br/><input className="form-control" type="text" placeholder='enter main ingredient here' onChange={handleNewIngredientChange} /></div><br/>
        <div className='form-row'>nationality: <br/><input className="form-control" type="text" placeholder="enter recipe nationality here" onChange={handleNewNationalityChange} /></div><br/>
        <div className='form-row'>link to recipe: <br/><input className="form-control" type="text" placeholder="enter link to recipe here" onChange={handleNewLinkChange} /></div><br/>
        <div className='form-row veggie-spicy'>
          <div className='veggie'>vegetarian? <input type="checkbox" onChange={handleNewVegetarianChange} /></div>
          <div className='spicy'>spicy? <input type="checkbox" onChange={handleNewSpicyChange} /></div>
        </div>
        <input className='btn btn-primary new-recipe-submit' type="submit" value="Post Recipe!"/>
      </form>
      <br/>
      </div>

      <div className="search-function">
      <form onSubmit={handleSearchRequest}>
            <input type="text" className="searchbar" placeholder="Search Here" onChange={handleNewSearch} />
            <input type="submit" value="Search" />
      </form>

      <form onSubmit={handleAllShow}>
          <input type="submit" value="Clear Search"/>
      </form>
      </div>

      <div className='recipe-container'>
        {
          recipes.map((recipe)=>{
            return <>
              <Recipe recipe={recipe} setRecipes={setRecipes}/>
            </>
          })

          }
      </div>

    </div>
  )
}

export default App;
