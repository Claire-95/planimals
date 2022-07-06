import { GetPets } from "../services/pet-service";
import LoginService from "../services/login-service";

const AllPets = () => {
  console.log(LoginService);
  if (LoginService.loggedIn) {
    return GetPets();
  }
  return GetPets();
};

export default AllPets;
