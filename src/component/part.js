import {useState} from 'react'
import '../App.css';

const Recipe = (props)=>{
  return(
    <div>

      <p>This is {props.recipe.name}</p>

    </div>
  )

}

export default Recipe;
