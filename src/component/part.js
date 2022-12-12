import {useEffect, useState} from 'react'
import '../App.css';
import axios from 'axios';
import EditForm from './editform';

const Recipe = (props)=>{

    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const revealUpdate = () => {
      {(showUpdateForm) ? setShowUpdateForm(false) : setShowUpdateForm(true)}
    }



    const deleteRecipe= (recipeData) => {
      console.log(recipeData)
      axios.delete(`http://localhost:3000/recipe/${recipeData._id}`).then(() => {
        axios.get('http://localhost:3000/recipe/').then((response) => {
          props.setRecipes(response.data)
        })
      })

    }

    //Functions for favorite a post
  const addFav = (recipeData) => {
    axios.put(`http://localhost:3000/recipe/fav/${recipeData._id}/${props.user._id}`).then((res)=>{
      console.log(res.data)
    })
  }

  const removeFav = (recipeData) => {
    axios.put(`http://localhost:3000/recipe/unfav/${recipeData.recipe._id}/${props.user._id}`).then((res)=>{
      console.log(res.data)
    })
  }


  return(
    <div>
      {(showUpdateForm) ?
      < EditForm recipe={props.recipe} revealUpdate={revealUpdate} setRecipes={props.setRecipes} />

      :

      <div>
       <div className="card" style={{width:"20rem"}}>
        <img src={props.recipe.image} className="card-img-top"/>
        <h5 className="card-title">{props.recipe.name}</h5>
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

          {(props.recipe.favs.indexOf(props.user._id) > -1) 
          ? 
            <img className="heart" onClick={()=>{removeFav(props.recipe)}} src="https://i.imgur.com/wORoc2c.png" /> 
          : 
            <img className='heart' onClick={()=>{addFav(props.recipe)}} src="https://i.imgur.com/PjRRzBE.png"/> 
          }
  
        </div>
        <div className="card-body">
          <a href={props.recipe.link} className="btn btn-info">link</a>
          <button className="btn btn-primary" onClick={revealUpdate}>Edit</button>
          <button className="btn btn-danger"  onClick={()=> {deleteRecipe(props.recipe)}}>Delete</button>
       </div>
       </div>
       </div>
      }
    </div>
  )
}

export default Recipe;
