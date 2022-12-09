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
      <p>This is {props.recipe.name}</p>
      <button onClick={revealUpdate}>edit</button>
      <button onClick={()=> {deleteRecipe(props.recipe)}}>delete</button>
      </div>

      }
    </div>
  )

}

export default Recipe;
