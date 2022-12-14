import axios from "axios";
import React, { useState, useEffect } from "react";

// FOLLOWED THIS TUTORIAL TO CREATE COMPONENT 
//https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 //

const StarRating = (props) => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [lastRating, setLastRating] = useState(0)

    const handleRatingRequest = (index) => {
        setRating(index)
        console.log(rating)
    }
    
    useEffect(()=>{
        if (props.user.username) {
        for (let i = 0; i < props.recipe.ratings.length; i++) {
            if (props.recipe.ratings[i].user === props.user.username) {
                setRating(props.recipe.ratings[i].rating)
                setLastRating(props.recipe.ratings[i].rating)
            }
        }     
    }}, [])

    useEffect(()=>{
        let alreadyRated = false
        let userID = 0 

        for (let i=0; i < props.recipe.ratings.length; i++) {
            if (props.recipe.ratings[i].user === props.user.username) {
                alreadyRated = true
            }
        }
        console.log(alreadyRated)
        if (rating !== 0 && rating !== null && alreadyRated===false) {
        axios
            .put(`https://polar-forest-73812.herokuapp.com/recipe/rating/${props.recipe._id}`,
            {
                user: props.user.username,
                rating: rating
            })
            .then(()=>{
                axios
                .get(props.lastSearch).then((res)=>{
                    console.log(res.data)
                    props.setRecipes(res.data)
            })
        })
        } else if (rating !== 0 && rating !== null && alreadyRated===true){
            console.log("already rated is true")
            axios
            .put(`https://polar-forest-73812.herokuapp.com/recipe/rating/alreadyrated/${props.recipe._id}`,
            {
                user: props.user.username,
                rating: rating,
            }).then(()=>{
                axios
                .put(`https://polar-forest-73812.herokuapp.com/recipe/rating/${props.recipe._id}`,
                {
                    user: props.user.username,
                    rating: rating
                })
                .then(()=>{
                    axios
                    .get(props.lastSearch).then((res)=>{
                        console.log(res.data)
                        props.setRecipes(res.data)
                })
            })
            })
        
    }}
        , [rating]
    
    )





    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => {handleRatingRequest(index)}}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="gold-star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;