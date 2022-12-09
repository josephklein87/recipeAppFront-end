import {useState} from 'react'
import '../App.css';
import axios from 'axios';

const Recipe = (props)=>{

    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [updatedName, setUpdatedName] = useState('')
    const [updatedImage, setUpdatedImage] = useState('')
    const [updatedTime, setUpdatedTime] = useState(0)
    const [updatedVegetarian, setUpdatedVegetarian] = useState('')
    const [updatedSpicy, setUpdatedSpicy] = useState('')
    const [updatedNationality, setUpdatedNationality] = useState('')
    const [updatedIngredient, setUpdatedIngredient] = useState("")
    const [updatedLink, setUpdatedLink] = useState("")

    const handleUpdatedNameChange = (e) => {
        setUpdatedName(e.target.value)
      }

      const handleUpdatedImageChange = (e) => {
        setUpdatedImage(e.target.value)
      }

      const handleUpdatedTimeChange = (e) => {
        setUpdatedTime(e.target.value)
      }

      const handleUpdatedVegetarianChange = (e) => {
        setUpdatedVegetarian(e.target.value)
      }

      const handleUpdatedSpicyChange= (e) => {
        setUpdatedSpicy(e.target.value)
      }

      const handleUpdatedNationalityChange= (e) => {
        setUpdatedNationality(e.target.value)
      }

      const handleUpdatedIngredientChange= (e) => {
        setUpdatedIngredient(e.target.value)
      }

      const handleUpdatedLinkChange= (e) => {
        setUpdatedLink(e.target.value)
      }

      const revealUpdate = () => {
        {(showUpdateForm) ? setShowUpdateForm(false) : setShowUpdateForm(true)}
      }

      const handleUpdatedRecipe = (recipeData) => {
        console.log("This is the animal data from update" + recipeData)
        axios
        .put(
            `http://localhost:3000/recipe/${recipeData._id}`,
            {
              name: updatedName,
              image : updatedImage,
              timeToPrepare: updatedTime,
              mainIngredient: updatedIngredient,
              nationality: updatedNationality,
              link: updatedLink,
              vegetarian: updatedVegetarian,
              spicy: updatedSpicy
            }
        )
    }

    const deleteRecipe= (recipeData) => {
      console.log(recipeData)
      axios.delete(`http://localhost:3000/recipe/${recipeData._id}`).then(() => {
        axios.get('http://localhost:3000/recipe/').then((response) => {
          props.setRecipes(response.data)
        })
      })
      console.log(recipeData);
    }



  return(
    <div>
      <p>This is {props.recipe.name}</p>
      <button onClick={revealUpdate}>edit</button>
      <button onClick={()=> {deleteRecipe(props.recipe)}}>delete</button>
    </div>
  )

}

export default Recipe;
