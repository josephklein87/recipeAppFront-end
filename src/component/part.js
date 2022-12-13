import {useEffect, useState} from 'react'
import '../App.css';
import axios from 'axios';
import EditForm from './editform';
import RecipeCard from './recipeCard';

const Recipe = (props)=>{

    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const [updatedName, setUpdatedName] = useState('')
    const [updatedImage, setUpdatedImage] = useState('')
    const [updatedTime, setUpdatedTime] = useState(0)
    const [updatedVegetarian, setUpdatedVegetarian] = useState(false)
    const [updatedSpicy, setUpdatedSpicy] = useState(false)
    const [updatedNationality, setUpdatedNationality] = useState('')
    const [updatedIngredient, setUpdatedIngredient] = useState("")
    const [updatedLink, setUpdatedLink] = useState("")

    const revealUpdate = () => {
      {(showUpdateForm) ? setShowUpdateForm(false) : setShowUpdateForm(true)}
    }



    const deleteRecipe= (recipeData) => {
      console.log(recipeData)
      axios.delete(`https://polar-forest-73812.herokuapp.com/recipe/${recipeData._id}`).then(() => {
        axios.get(props.lastSearch).then((response) => {
          props.setRecipes(response.data)
        })
      })

    }

    //Functions for favorite a post
  const addFav = (recipeData) => {
    axios.put(`https://polar-forest-73812.herokuapp.com/recipe/fav/${recipeData._id}/${props.user._id}`).then((res)=>{
      axios.get(props.lastSearch).then((response) => {
          props.setRecipes(response.data)
    })
    })
  }

  const removeFav = (recipeData) => {
    axios.put(`https://polar-forest-73812.herokuapp.com/recipe/unfav/${recipeData._id}/${props.user._id}`).then((res)=>{
      axios.get(props.lastSearch).then((response) => {
        props.setRecipes(response.data)
  })
  })
}

const holdValue = ()=> {
setUpdatedName(props.recipe.name)
setUpdatedImage(props.recipe.image)
setUpdatedLink(props.recipe.link)
setUpdatedIngredient(props.recipe.ingredient)
setUpdatedNationality(props.recipe.nationality)
setUpdatedTime(props.recipe.timeToPrepare)
setUpdatedSpicy(props.recipe.spicy)
setUpdatedVegetarian(props.recipe.vegetarian)
}


  return(
    <div>
      {(showUpdateForm) ?
      < EditForm recipe={props.recipe} 
      setRecipes={props.setRecipes}
      revealUpdate={revealUpdate} 
      lastSearch={props.lastSearch} 
      updatedName={updatedName} 
      setUpdatedName={setUpdatedName} 
      updatedImage={updatedImage} 
      setUpdatedImage={setUpdatedImage} 
      updatedLink={updatedLink} 
      setUpdatedLink={setUpdatedLink} 
      updatedIngredient={updatedIngredient} 
      setUpdatedIngredient={setUpdatedIngredient} 
      updatedNationality={updatedNationality} 
      setUpdatedNationality={setUpdatedNationality}
      updatedTime={updatedTime}
      setUpdatedTime={setUpdatedTime}
      updatedSpicy={updatedSpicy}
      setUpdatedSpicy={setUpdatedSpicy}
      updatedVegetarian={updatedVegetarian}
      setUpdatedVegetarian={setUpdatedVegetarian}/>

      :

      <div>
       <div className="card" style={{width:"20rem"}}>
        <img src={props.recipe.image} className="card-img-top"/>
        <h5 className="card-title">{props.recipe.name}</h5>
        <p className='submitted-by'>Submitted by: {props.recipe.submittedBy}</p>
        <p>Time to prepare: {props.recipe.timeToPrepare} minutes</p>
        <p>Main Ingredient: {props.recipe.mainIngredient}</p>
        <p>Nationality: {props.recipe.nationality}</p>
        <div className="card-body">
          <div className='spicy-veggie-icons'>
            {(props.recipe.vegetarian) 
            ? 
              <img className='veg-symbol' 
              src="https://i.imgur.com/qI58tSq.png"/> 
            : 
              null
            }
            {(props.recipe.spicy) 
            ? 
              <img className='veg-symbol' src="https://i.imgur.com/H3taGMI.png"/> 
            : 
              null
            }

          </div>
          {(props.user.username) ?
          <>
          {(props.recipe.favs.indexOf(props.user._id) > -1) 
          ? 
            <img className="heart" onClick={()=>{removeFav(props.recipe)}} src="https://i.imgur.com/wORoc2c.png" /> 
          : 
            <img className='heart' onClick={()=>{addFav(props.recipe)}} src="https://i.imgur.com/PjRRzBE.png"/> 
          }
          </>
          :
          null
         }
  
        </div>
        <div className="card-body">
          <a href={props.recipe.link} className="btn btn-info">link</a>
          <button className="btn btn-primary" onClick={()=>{revealUpdate(); holdValue()} }>Edit</button>
          <button className="btn btn-danger"  onClick={()=> {deleteRecipe(props.recipe)}}>Delete</button>
       </div>
       </div>
       </div>
      }
    </div>
  )
}

export default Recipe;
