export const changeLoginState = (currentState) => {
  if (currentState == "login") return "signup";
  else if (currentState == "signup") return "login";
};
