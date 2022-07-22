import Card from "../ui/Card";
import classes from "./Pet.module.css";
import PetsIcon from "@mui/icons-material/Pets";
import { DeletePet } from "../../services/pet-service";

//Produces content for pet cards
function Pet(props) {
  function DeletePetHandler(petData) {
    console.log(petData);
    console.log(petData.id);
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
        <div className={classes.actions}>
          <button
            className={classes.actions}
            onClick={() => {
              DeletePetHandler(props);
            }}
          >
            Delete Pet
            <PetsIcon />
          </button>
        </div>
      </Card>
    </li>
  );
}

export default Pet;
