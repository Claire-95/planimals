import NewPetForm from "../components/pets/NewPetForm";
import { SetPet } from "../services/pet-service";

const AddNewPet = () => {
  function AddPetHandler(petData) {
    console.log(petData);
    SetPet(petData);
  }

  return (
    <section>
      <h1>Add New Pet</h1>
      <NewPetForm onAddPet={AddPetHandler} />
    </section>
  );
};

export default AddNewPet;
