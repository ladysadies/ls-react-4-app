// pulls details from db into accordion
// within accordion have edit/delete buttons

import React, {useState, useEffect} from "react"
import {db} from "../firebase"

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Modal from '@material-ui/core/Modal'

import Button from '@material-ui/core/Button'


//part of accordion material ui
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

  
function DisplayedRecipes(){

    //part of accordion material ui
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [open, setOpen] = useState(false)
    const [clicked, setClicked] = useState(false)

    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [directions, setDirections] = useState("")

    const [ recipeId, setRecipeId] = useState("")

    //pull data from db
    const [recipePost, setRecipePost] = useState(
    [])
    useEffect(()=>{
        db.collection('recipes').onSnapshot(snapshot => {
          console.log(snapshot.docs.map(doc=>doc.data()))
            setRecipePost(snapshot.docs.map(doc=>doc.data()))
    })
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    };

    const handleEditOpenModal= (e, recipe) => {
      setOpen(true);    
      setRecipeId(recipe.id)
  }
  
    const handleEditCloseModal= () => {
      setOpen(false);    
  }
  
  const handleEditRecipe = (e, recipe) => {
      e.preventDefault();
      const editedRecipe = {name: name,
      ingredients: ingredients,
      directions: directions,
      id: recipeId
      }
      console.log(editedRecipe)

      db.collection("recipes").doc(`${recipeId}`).update({
        name: name,
        ingredients: ingredients,
        directions: directions,
        id: recipeId
    })
    .then(() => {
        console.log("Document successfully updated!");
    });
    

  }

    //Edit and delete buttons within the Accordion Recipe
    //Edit button should open a modal to edit recipe title/ingredients/directions
    //Delete button should remove the recipe from the accordion/db
    
    // pass in ID that's being tracked
    //create random ID
    //user clicks -> pass recipe into edit recipe function
    //want ID to stay same, other details can change
    //query the database (based on new obj update database)

  return (
    <div className={classes.root}>
        {recipePost.map(accordion => {
            const {name, ingredients, directions} = accordion
            return(
                <div>
                <Accordion expanded={expanded === name} key = {name} onChange={handleChange(name)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography className={classes.heading}>{name}</Typography>
                    <Typography className={classes.secondaryHeading}>{ingredients}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        {directions}
                    </Typography>
                    </AccordionDetails>

                    
                    <Button variant="contained" color="primary" onClick= {(e) => handleEditOpenModal(e, accordion)}>
                    Edit Recipe
                    </Button>

                    <Button variant="contained" color="primary" >
                    Delete Recipe
                    </Button>

                </Accordion>
                </div> 
            )
        })}

<Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleEditCloseModal}
            >
                <div>
                <div>
          <form>
            <input
              style={{width: '100%'}}
              type="text"
              placeholder="Recipe Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <br/>
            <input
              style={{width: '100%'}}
              type="text"
              placeholder="Ingredients separated by comma"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <br/>
            <textarea
              style={{width: '100%'}}
              placeholder="Description"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
            />
            <br/>
            <button onClick={handleEditRecipe}>Edit recipe</button>
          </form>
        </div>
                </div>
            </Modal>
           
      </div>      )

}   

export default DisplayedRecipes
