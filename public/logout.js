function Logout() {
  let userCtx = React.useContext(UserContext);
  //console.log(userCtx.currentUser);
  let message;

  if (userCtx.currentUser.email) {
    console.log("logout");
    let userName = document.getElementById("userName");
    userName.innerHTML = "";
    document.getElementById("createAccountLink").style.display = "";
    document.getElementById("loginLink").style.display = "";
    document.getElementById("logoutLink").style.display = "none";
    document.getElementById("allDataLink").style.display = "none";

    userCtx.currentUser = [, , ,];
    Cookies.remove("bearerToken");
    Cookies.remove("gToken");

    message = "Signed Out Successfully";
    //console.log("logout auth ", firebase.auth());

    firebase.auth().signOut();

    //console.log(userCtx.currentUser);
  } else {
    message = "No logged in user to signout";
  }

  return (
    <Card bgcolor="info" txtcolor="white" header="Signout" body={message} />
  );
}
