import Card from "../ui/Card";
import classes from "./Pet.module.css";
import Button from "@mui/material/Button";
import PetsIcon from "@mui/icons-material/Pets";
import { DeletePet } from "../../services/pet-service";

function Pet(props) {
  function DeletePetHandler(petData) {
    console.log(petData);
    DeletePet(petData);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.firstName}</h3>
          <p>{props.lastName}</p>
          <p>{props.species}</p>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            DeletePetHandler();
          }}
        >
          Delete Pet
          <PetsIcon />
        </Button>
      </Card>
    </li>
  );
}

export default Pet;
