import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const getRegistrationData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const registerUser = async ({ render, request, response }) => {
  const registrationData = await getRegistrationData(request);
  const [passes, errors] = await validasaur.validate(registrationData, validationRules);
  if (!passes) {
    registrationData.validationErrors = errors;
    render("register.eta", registrationData);
  } else {
    await userService.addUser(
      registrationData.email,
      await bcrypt.hash(registrationData.password),
    );
    response.redirect("/auth/login");
    }
};

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

export { registerUser, showRegistrationForm };
