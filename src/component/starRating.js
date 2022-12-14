import axios from "axios";
import React, { useState, useEffect } from "react";

// FOLLOWED THIS TUTORIAL TO CREATE COMPONENT 
//https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 //

const StarRating = (props) => {

    // sets states for ratings//
    const [lastRating, setLastRating] = useState(0)

    const handleRatingRequest = (index) => {
        props.setRating(index)
        console.log(props.rating)
    }
    
    //if the user is logged in it will check the database if they have a rating already for this and set the rating to that rating

    // useEffect(()=>{
    //     if (props.user.username) {
    //     for (let i = 0; i < props.recipe.ratings.length; i++) {
    //         if (props.recipe.ratings[i].user === props.user.username) {
    //             props.setRating(props.recipe.ratings[i].rating)
    //         }
    //     }     
    // }}, [props.recipes])

    useEffect(()=>{

        // states for whether or not the user has made  arating before
        let alreadyRated = false
        let userID = 0 

        //loop checks the database to see if the username is contained in the ratings key

        for (let i=0; i < props.recipe.ratings.length; i++) {
            if (props.recipe.ratings[i].user === props.user.username) {
                alreadyRated = true
            }
        }
        console.log(alreadyRated)

        // if the username is not included it will send a put request to the server to push the username and the rating into the ratings key

        if (props.rating !== 0 && props.rating !== null && alreadyRated===false) {
        axios
            .put(`https://polar-forest-73812.herokuapp.com/recipe/rating/${props.recipe._id}`,
            {
                user: props.user.username,
                rating: props.rating
            })
            .then(()=>{
                axios
                .get(props.lastSearch).then((res)=>{
                    console.log(res.data)
                    props.setRecipes(res.data)
            })
        })

        //if the user is included it will pull out the old rating and update it with the new rating

        } else if (props.rating !== 0 && props.rating !== null && alreadyRated===true){
            console.log("already rated is true")
            axios
            .put(`https://polar-forest-73812.herokuapp.com/recipe/rating/alreadyrated/${props.recipe._id}`,
            {
                user: props.user.username,
                rating: props.rating,
            }).then(()=>{
                axios
                .put(`https://polar-forest-73812.herokuapp.com/recipe/rating/${props.recipe._id}`,
                {
                    user: props.user.username,
                    rating: props.rating
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
        , [props.rating]
    
    )





    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (props.hover || props.rating) ? "on" : "off"}
              onClick={() => {handleRatingRequest(index)}}
              onMouseEnter={() => props.setHover(index)}
              onMouseLeave={() => props.setHover(props.rating)}
            >
              <span className="gold-star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;