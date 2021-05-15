import React from 'react'
import './App.css'
import DisplayedRecipes from "./components/DisplayedRecipes"
import NewRecipe from "./components/NewRecipe"


const App = () => {
    return (
      <div className="primary-div">
          <div className="header">

          </div>
          <h1>React Recipe App</h1>
          < NewRecipe />
          < DisplayedRecipes />
        
      </div>
    );
  };
  
  export default App