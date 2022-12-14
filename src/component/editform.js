import {useState} from 'react'
import '../App.css';
import axios from 'axios';

const EditForm = (props)=>{

    const [updatedName, setUpdatedName] = useState('')
    const [updatedImage, setUpdatedImage] = useState('')
    const [updatedTime, setUpdatedTime] = useState(0)
    const [updatedVegetarian, setUpdatedVegetarian] = useState(false)
    const [updatedSpicy, setUpdatedSpicy] = useState(false)
    const [updatedNationality, setUpdatedNationality] = useState('')
    const [updatedIngredient, setUpdatedIngredient] = useState("")
    const [updatedLink, setUpdatedLink] = useState("")

    const handleUpdatedNameChange = (e) => {
        console.log(updatedName)
        setUpdatedName(e.target.value)
      }

      const handleUpdatedImageChange = (e) => {
        setUpdatedImage(e.target.value)
      }

      const handleUpdatedTimeChange = (e) => {
        setUpdatedTime(e.target.value)
      }

      const handleUpdatedVegetarianChange = (e) => {
        setUpdatedVegetarian(e.target.checked)
        console.log(updatedVegetarian)
      }

      const handleUpdatedSpicyChange= (e) => {
        setUpdatedSpicy(e.target.checked)
        console.log(updatedSpicy)
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

      const handleUpdatedRecipe = (e) => {
        e.preventDefault()
        console.log("This is data from update" + props.recipe._id)
        axios
        .put(
            `https://polar-forest-73812.herokuapp.com/recipe/${props.recipe._id}`,
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
            ).then((res)=> {
              axios
                .get(props.lastSearch)
                .then((res)=>{
                  props.setRecipes(res.data)
                  props.revealUpdate()
                })
            })
          }



return(
    <div className="edit-main-container">
      <div className="edit-div">
        <form className="edit-form" onSubmit={handleUpdatedRecipe} >
        <div className='form-row'>name: <br/><input type="text" className="input" defaultValue={props.recipe.name} onChange={handleUpdatedNameChange}/></div><br/>
        <div className='form-row'>image url: <br/><input type="text" className="input" defaultValue={props.recipe.image} onChange={handleUpdatedImageChange} /></div><br/>
        <div className='form-row'>time to prepare: <br/><input type="text" className="input" defaultValue={props.recipe.timeToPrepare} onChange={handleUpdatedTimeChange} /></div><br/>
        <div className='form-row'>main ingredient: <br/><input type="text" className="input" defaultValue={props.recipe.mainIngredient} onChange={handleUpdatedIngredientChange} /></div><br/>
        <div className='form-row'>nationality: <br/><input type="text" className="input" defaultValue={props.recipe.nationality} onChange={handleUpdatedNationalityChange} /></div><br/>
        <div className='form-row'>link to recipe: <br/><input type="text" className="input" defaultValue={props.recipe.link} onChange={handleUpdatedLinkChange} /></div><br/>
        <div className='form-box'>
        <div className='form-row'>vegetarian? <input type="checkbox" defaultChecked ={props.recipe.vegetarian} onChange={handleUpdatedVegetarianChange} /></div><br/>
        <div className='form-row'>spicy? <input type="checkbox" defaultChecked = {props.recipe.spicy} onChange={handleUpdatedSpicyChange} /></div><br/>
        </div>
        <button className="submit-edit-button submit-button btn btn-primary" type='submit'>Submit Edits</button>
        <button className='back-button btn btn-dark' onClick={props.revealUpdate}>Back</button>

        </form>
      </div>
    </div>
)


}

export default EditForm
