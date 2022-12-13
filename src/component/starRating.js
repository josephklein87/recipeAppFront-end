import axios from "axios";
import React, { useState } from "react";

// FOLLOWED THIS TUTORIAL TO CREATE COMPONENT 
//https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 //

const StarRating = (props) => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleRatingRequest = () => {
        axios
        .put(`http://polar-forest-73812.herokuapp.com/recipe/rating/${props.recipe._id}`,
        {
            user: props.user.username,
            rating: rating
        })
        .then(()=>{
        axios
        .get(props.lastSearch).then((res)=>{
            props.setRecipes(res.data)
        })

        })

    }
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => {setRating(index); handleRatingRequest()}}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;