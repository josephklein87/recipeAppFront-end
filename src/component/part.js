import {useEffect, useState} from 'react'
import '../App.css';
import axios from 'axios';
import EditForm from './editform';
import RecipeCard from './recipeCard';
import StarRating from './starRating';

const Recipe = (props)=>{

    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const [updatedName, setUpdatedName] = useState('')
    const [updatedImage, setUpdatedImage] = useState('')
    const [updatedTime, setUpdatedTime] = useState(0)
    const [updatedVegetarian, setUpdatedVegetarian] = useState(false)
    const [updatedSpicy, setUpdatedSpicy] = useState(false)
    const [updatedNationality, setUpdatedNationality] = useState('')
    const [updatedIngredient, setUpdatedIngredient] = useState("")
    const [updatedLink, setUpdatedLink] = useState("")
    const [averageRating, setAverageRating]= useState(0)
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const revealUpdate = () => {
      {(showUpdateForm) ? setShowUpdateForm(false) : setShowUpdateForm(true)}
    }



    const deleteRecipe= (recipeData) => {
      console.log(recipeData)
      axios.delete(`https://polar-forest-73812.herokuapp.com/recipe/${recipeData._id}`).then(() => {
        axios.get(props.lastSearch).then((response) => {
          props.setRecipes(response.data)
        })
      })

    }

    //Functions for favorite a post
  const addFav = (recipeData) => {
    axios.put(`https://polar-forest-73812.herokuapp.com/recipe/fav/${recipeData._id}/${props.user._id}`).then((res)=>{
      axios.get(props.lastSearch).then((response) => {
          props.setRecipes(response.data)
      })
    })
  }

  const removeFav = (recipeData) => {
    axios.put(`https://polar-forest-73812.herokuapp.com/recipe/unfav/${recipeData._id}/${props.user._id}`).then((res)=>{
      axios.get(props.lastSearch).then((response) => {
        props.setRecipes(response.data)
      })
    })
  }

  const holdValue = ()=> {
    setUpdatedName(props.recipe.name)
    setUpdatedImage(props.recipe.image)
    setUpdatedLink(props.recipe.link)
    setUpdatedIngredient(props.recipe.ingredient)
    setUpdatedNationality(props.recipe.nationality)
    setUpdatedTime(props.recipe.timeToPrepare)
    setUpdatedSpicy(props.recipe.spicy)
    setUpdatedVegetarian(props.recipe.vegetarian)
  }

  const handleRatingRequest = (index) => {
    setRating(index)
    console.log(props.rating)
}

useEffect(()=>{

  // states for whether or not the user has made  arating before
  let alreadyRated = false
  let userID = 0 
  let index

  //loop checks the database to see if the username is contained in the ratings key

  for (let i=0; i < props.recipe.ratings.length; i++) {
      if (props.recipe.ratings[i].user === props.user.username) {
          alreadyRated = true
          index = i
      }
  }
  console.log(alreadyRated)

  // if the username is not included it will send a put request to the server to push the username and the rating into the ratings key

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
  } else if (rating !== 0 && rating !==null && rating===props.recipe.ratings[index].rating) {

    console.log("its the same")
  //if the user is included it will pull out the old rating and update it with the new rating

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

  //adds up all the values in the ratings/rating field of the database entry and divides them by the length to get the average

  const ratingCalculator = ()=>{
   let total = 0
   let ratings = props.recipe.ratings

   for (let i = 0; i < ratings.length; i++) {
    total += ratings[i].rating
   }
    setAverageRating(Math.round(total / ratings.length))
  }

  //activates the rating calculator function eveery time the recipes list is changed

  useEffect(()=>{
    ratingCalculator()
    console.log("This is the average rating:" + averageRating)
  }, [props.recipes])


  // sets the rating state
  useEffect(()=>{
    if (props.user.username) {
    for (let i = 0; i < props.recipe.ratings.length; i++) {
        if (props.recipe.ratings[i].user === props.user.username) {
            setRating(props.recipe.ratings[i].rating)
        }
        console.log("this is the rating: " + rating + "of " + props.recipe.name)
    }     
  }}, [props.recipes])

//sends a request to the server to update the average rating every time the average rating state is changed
  useEffect(()=>{
    axios.put(`https://polar-forest-73812.herokuapp.com/recipe/averagerating/${props.recipe._id}`,
    {
      avg: averageRating
    })
  }, [averageRating])

  return(
    <div>
      {(showUpdateForm) ?
      < EditForm recipe={props.recipe} 
      setRecipes={props.setRecipes}
      revealUpdate={revealUpdate} 
      lastSearch={props.lastSearch} 
      updatedName={updatedName} 
      setUpdatedName={setUpdatedName} 
      updatedImage={updatedImage} 
      setUpdatedImage={setUpdatedImage} 
      updatedLink={updatedLink} 
      setUpdatedLink={setUpdatedLink} 
      updatedIngredient={updatedIngredient} 
      setUpdatedIngredient={setUpdatedIngredient} 
      updatedNationality={updatedNationality} 
      setUpdatedNationality={setUpdatedNationality}
      updatedTime={updatedTime}
      setUpdatedTime={setUpdatedTime}
      updatedSpicy={updatedSpicy}
      setUpdatedSpicy={setUpdatedSpicy}
      updatedVegetarian={updatedVegetarian}
      setUpdatedVegetarian={setUpdatedVegetarian}/>

      :

      <div>
       <div className="card" style={{width:"20rem"}}>
        <img src={props.recipe.image} className="card-img-top"/>
        <h5 className="card-title">{props.recipe.name}</h5>
        <div className="avg-star-container">
          {(averageRating > 0) ?
          <>
          {[...Array(averageRating)].map((star)=>{
            return (
              <span className="gold-star">&#9733;</span>
            )
          })}
          </>
          :
          <p>No ratings yet</p>
        }
        </div>
        <p className='submitted-by'>Submitted by: {props.recipe.submittedBy}</p>
        <p>Time to prepare: {props.recipe.timeToPrepare} minutes</p>
        <p>Main Ingredient: {props.recipe.mainIngredient}</p>
        <p>Nationality: {props.recipe.nationality}</p>
        {props.user.username ? 
          <>
          <p>Your Rating:</p>
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
              onMouseLeave={() => setHover(props.rating)}
            >
              <span className="gold-star">&#9733;</span>
            </button>
          );
        })}
      </div>
          </>
          :
          null
          }
        <div className="card-body">
          <div className='spicy-veggie-icons'>
            {(props.recipe.vegetarian) 
            ? 
              <img className='veg-symbol' 
              src="https://i.imgur.com/qI58tSq.png"/> 
            : 
              null
            }
            {(props.recipe.spicy) 
            ? 
              <img className='veg-symbol' src="https://i.imgur.com/H3taGMI.png"/> 
            : 
              null
            }

          </div>
          {(props.user.username) ?
          <>
          {(props.recipe.favs.indexOf(props.user._id) > -1) 
          ? 
            <img className="heart" onClick={()=>{removeFav(props.recipe)}} src="https://i.imgur.com/wORoc2c.png" /> 
          : 
            <img className='heart' onClick={()=>{addFav(props.recipe)}} src="https://i.imgur.com/PjRRzBE.png"/> 
          }
          </>
          :
          null
         }
  
        </div>
        <div className="card-body">
          <a href={props.recipe.link} className="btn btn-info">link</a>
          {((props.user.username === props.recipe.submittedBy && props.user.username !== undefined) || props.user.username==="admin") ?
          <>
            <button className="btn btn-primary" onClick={()=>{revealUpdate(); holdValue()} }>Edit</button>
            <button className="btn btn-danger"  onClick={()=> {deleteRecipe(props.recipe)}}>Delete</button>
          </>
          :
          null
          } 
       </div>
       </div>
       </div>
      }
    </div>
  )
}

export default Recipe;
