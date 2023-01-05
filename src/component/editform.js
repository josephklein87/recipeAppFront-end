import {useState} from 'react'
import '../App.css';
import axios from 'axios';

const EditForm = (props)=>{

    const handleUpdatedNameChange = (e) => {
        console.log(props.updatedName)
        props.setUpdatedName(e.target.value)
      }

      const handleUpdatedImageChange = (e) => {
        props.setUpdatedImage(e.target.value)
      }

      const handleUpdatedTimeChange = (e) => {
        props.setUpdatedTime(e.target.value)
      }

      const handleUpdatedVegetarianChange = (e) => {
        props.setUpdatedVegetarian(e.target.checked)
        console.log(props.updatedVegetarian)
      }

      const handleUpdatedSpicyChange= (e) => {
        props.setUpdatedSpicy(e.target.checked)
        console.log(props.updatedSpicy)
      }

      const handleUpdatedNationalityChange= (e) => {
        props.setUpdatedNationality(e.target.value)
    
      }

      const handleUpdatedIngredientChange= (e) => {
        props.setUpdatedIngredient(e.target.value)
      }

      const handleUpdatedLinkChange= (e) => {
        props.setUpdatedLink(e.target.value)
      }

      const handleUpdatedRecipe = (e) => {
        e.preventDefault()
        console.log("This is data from update" + props.recipe._id)
        axios
        .put(
            `https://polar-forest-73812.herokuapp.com/recipe/${props.recipe._id}`,
            {
              name: props.updatedName,
              image : props.updatedImage,
              timeToPrepare: props.updatedTime,
              mainIngredient: props.updatedIngredient,
              nationality: props.updatedNationality,
              link: props.updatedLink,
              vegetarian: props.updatedVegetarian,
              spicy: props.updatedSpicy
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
        <div className='form-row'>name: <br/><input type="text" className="input form-control" defaultValue={props.recipe.name} onChange={handleUpdatedNameChange}/></div><br/>
        <div className='form-row'>image url: <br/><input type="text" className="input form-control" defaultValue={props.recipe.image} onChange={handleUpdatedImageChange} /></div><br/>
        <div className='form-row'>time to prepare: <br/><input type="text" className="input form-control" defaultValue={props.recipe.timeToPrepare} onChange={handleUpdatedTimeChange} /></div><br/>
        <div className='form-row'>main ingredient: <br/><input type="text" className="input form-control" defaultValue={props.recipe.mainIngredient} onChange={handleUpdatedIngredientChange} /></div><br/>
        <div className='form-row'>nationality: <br/><input type="text" className="input form-control" defaultValue={props.recipe.nationality} onChange={handleUpdatedNationalityChange} /></div><br/>
        <div className='form-row'>link to recipe: <br/><input type="text" className="input form-control" defaultValue={props.recipe.link} onChange={handleUpdatedLinkChange} /></div><br/>
        <div className='form-box'>
        <div className='form-row vegetarian-edit'>vegetarian? <input type="checkbox" defaultChecked ={props.recipe.vegetarian} onChange={handleUpdatedVegetarianChange} /></div><br/>
        <div className='form-row spicy-edit'>spicy? <input type="checkbox" defaultChecked = {props.recipe.spicy} onChange={handleUpdatedSpicyChange} /></div><br/>
        </div>
        <button className="submit-edit-button submit-button btn btn-primary" type='submit'>Submit Edits</button>
        <button className='back-button btn btn-dark' onClick={props.revealUpdate}>Back</button>

        </form>
      </div>
    </div>
)


}

export default EditForm
