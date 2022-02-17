export function authHeader() {
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "jwt " + localStorage.getItem("token"),
  };
}
