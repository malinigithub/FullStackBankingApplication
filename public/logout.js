function Logout() {
  let userCtx = React.useContext(UserContext);
  //console.log(userCtx.currentUser);
  let message;

  if (userCtx.currentUser.email) {
    uiUpdates("", false, "");

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
