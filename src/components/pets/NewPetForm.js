import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewPetForm.module.css";

function NewPetForm(props) {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const speciesInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredSpecies = speciesInputRef.current.value;

    const petData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      species: enteredSpecies,
    };

    props.onAddPet(petData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" required id="firstName" ref={firstNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" required id="lastName" ref={lastNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="species">Species</label>
          <input type="text" required id="species" ref={speciesInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add Pet</button>
        </div>
      </form>
    </Card>
  );
}

export default NewPetForm;
