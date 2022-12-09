import {useState} from 'react'
import '../App.css';

const Recipe = (props)=>{
  return(
    <div>
      <div className="card" style={{width:"20rem"}}>
        <img src={props.recipe.image} className="card-img-top"/>
        <h5 className="card-title">{props.recipe.name}</h5>
        <p>Time to prepare: {props.recipe.timeToPrepare} minutes</p>
        <p>Main Ingredient: {props.recipe.mainIngredient}</p>
        <p>Nationality: {props.recipe.nationality}</p>
        <div className="card-body">
          <p>Vegetarian? <input type="checkbox" /> </p>
          <p>Spicy? <input type="checkbox" /> </p>
        </div>
        <div className="card-body">
          <a href={props.recipe.link} className="btn btn-info">link</a>
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-danger" >Delete</button>
        </div>
      </div>
    </div>
  )

}

export default Recipe;
