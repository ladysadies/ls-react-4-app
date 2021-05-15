//create a new recipe in the db, create popup modal

import React, { useState } from "react"
import { db } from "../firebase"
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'


function rand() {
    return Math.round(Math.random() * 200) - 10;
}

// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function NewRecipe() {
    const classes = useStyles()
    // const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)

    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [directions, setDirections] = useState("")

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const saveRecipe = async (e) => {
        e.preventDefault()
        
        const id = rand()
    
        await db
          .collection("recipes").doc(`${id}`)
          .set({
            name,
            ingredients,
            directions,
            id
          });
    
        setName("")
        setIngredients("")
        setDirections("")

      };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add New Recipe
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div>
                {/* <div style={modalStyle} className={classes.paper}> */}
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
              placeholder="Directions"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
            />
            <br/>
            <button onClick={saveRecipe}>Save recipe</button>
          </form>
                </div>
            </Modal>
        </div>
    );
}