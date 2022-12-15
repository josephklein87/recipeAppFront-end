# YES, CHEF!
## a recipe organizing and rating app by Joe Klein and Peter Wu

links: 

The purpose of this app is for the user to be able upload recipes to the database, rate other user's recipes as well as save their favorite recipes to their account to access later.

### Technologies used:

We used React, Javascript, Express, and Mongoose to create the app as a single page website where the content is loaded in dynamically from user input using axios requests to the database and the map function to create lists of content based on those requests.

### Features:

1) Full CRUD functionality. Users can post new entries, edit and delete the entries they have posted, and view the posts of others. As we wanted to make it a user-focused site, users can only change posts they themselves have posted, as the posts are tied to their user account. This was accomplished by adding a submittedBy field in the recipe schema that is autopopulated by the username of the creator, and removing the ability to access certain buttons with ternary statements that check for username. Users can only see the main index and use sort and search while not logged in, they cannot post, rate or favorite. 

2) Text search bar using regex. Users can search by text to find entries that match several categories including main ingredient, nationality and the name of the recipe. 

3) Sort buttons that to see categories. Users can use buttons to see the posts they've favorited, the posts they've posted, the posts in order from highest rated to lowest, spicy recipes, vegetarian recipes, recipes that take less than 30 minutes to prepare, recipes that take more than 30 minutes to prepare and return to the main index. These were accomplished using axios requests to specific routes which return the required search results.

3) Users can favorite posts. Using an axios request to $push their user IDs into a "favs" key in the schema we add a favorite to the post, which fills in a red heart on the picture when the user views this post on their account, they can remove the fav by clicking the heart again, which unfills the heart and $pulls their ID from the database entry. A ternary statement checks whether the User's ID exists in the database entry with a for loop and if it finds it it fills in the heart, if not, the heart remains unfilled. 

4) Rating system. The user can use a five star rating system to rate posts. When they click on a star it sends the number of the star to a state which is then sent through an axios request to the server. This $pushes an object into the ratings key of the recipes database. This object contains the username of the rater as well as a number representing their rating. If the user wishes to change their rating, clicking the stars again will update the rating by first checking if the user rating already has a rating in the database with a for loop over the information. If the username is found, it changes the variable alreadyRated to true. If that variable is true, an axios request is sent to the database to $pull the first object containing the rating out of the database before adding the new one, preventing a user from doubling up on ratings. Then, a for loop goes over every rating in that entry for the database and adds all the ratings up, dividing them by the length of the array of ratings objects. This returns the average rating which we then set to a state. When that state changes a use effect updates the avgRating key in the recipes database which we then can use to sort by highest to lowest rating in the site. This average rating is displayed on the index tiles.

5) User creation and login. Users can create accounts and login. Their passwords are encrypted using bcrypt. Their user information is saved in a state when they log in and removed from the state when they log out. This is how the site knows whether they are logged in or not. 

### Technical Challenges

1) Creating the rating system was difficult. Sometimes it would read an updated state and update it to the wrong number. We fixed this using if statements that would check if the number was 0 or null and would not send the axios request if so (0 was the default number of the state and it would send that number out when the state refreshed to zero after a rating had already been made). Additionally, the code to save your rating to the star input was buggy because it was a component inside of the component. If the order of the tiles changed due to the sort function, the previous rating would not move to the new tile but would instead remain in the same placement, on the wrong tile. This was fixed by taking the star component out of its component and places it in the containing component with everything else.

### Possible Improvements

1) Would love to create a system where you can sort by what you previous searched or combine searches together. Right now you can only search by one parameter, either text or one of the sort buttons. But it would be nice to be able to combine them together, ie search for chicken and then click the spicy sort to show only the chicken dishes that are spicy.



