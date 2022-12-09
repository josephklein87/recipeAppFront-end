import {useState} from 'react'
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



  return(
    <div>
      {(showUpdateForm) ?
      < EditForm recipe={props.recipe} revealUpdate={revealUpdate} />

      :

      <div>
       <div className="card" style={{width:"20rem"}}>
        <img src={props.recipe.image} className="card-img-top"/>
        <h5 className="card-title">{props.recipe.name}</h5>
        <p>Time to prepare: {props.recipe.timeToPrepare} minutes</p>
        <p>Main Ingredient: {props.recipe.mainIngredient}</p>
        <p>Nationality: {props.recipe.nationality}</p>
        <div className="card-body">
          <p>Vegetarian? <input type="checkbox" defaultChecked={props.recipe.vegetarian} disabled/> </p>
          <p>Spicy? <input type="checkbox" defaultChecked={props.recipe.vegetarian} disabled/> </p>
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
