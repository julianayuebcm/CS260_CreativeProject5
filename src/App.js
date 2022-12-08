import React, { useState } from "react";
import Axios from "axios";
import './App.css';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <div className="RecipeContainer">
      <Dialog
        onClose={() => console.log("Container Closed")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        
        <DialogContent>
        <DialogTitle>Ingredients</DialogTitle>
          <div className="RecipeName">{label}</div>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{Math.round(ingredient.weight )} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <div className="SeeNewTab" onClick={() => window.open(url)}>See More</div>
          <div className="SeeMoreText" onClick={() => setShow("")}>Close</div>
        </DialogActions>
      </Dialog>
      <div className="RecipeName">{label}</div>
      <div className="CoverImage"><img src={image} alt={label}/></div> 
      <div className="IngredientsText" onClick={() => setShow(!show)}>
        INGREDIENTS
      </div>
      <div className="SeeMoreText" onClick={() => window.open(url)}>
        RECIPE
      </div>
    </div>
  );
};

function AppComponent() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="AppName">
        <div className="RecipeImage"><img src="./images/pineapple.svg" alt=""/></div>
          <h4>Recipes Land</h4>
        </div>
        <div className="SearchBox">
          <div className="SearchIcon"><img src='./images/search.svg' alt=""/></div>
          <textarea className="SearchInput"
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div className="RecipeListContainer">
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <div className="Placeholder">
              <div className="item">
                <img src="./images/salad.svg" alt=""/>
                <h2>Appetizers</h2>
              </div>
              <div className="item">
                <img src="./images/bbq.svg" alt=""/>
                <h2>Meals</h2>
              </div>
              <div className="item">
                <img src="./images/cake.svg" alt=""/>
                <h2>Desserts</h2>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppComponent;