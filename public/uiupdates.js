function uiUpdates(userrole, loggedinState, email) {
  //console.log("visibity updates");
  let userName = document.getElementById("userName");
  userName.innerHTML = email;

  if (loggedinState) {
    document.getElementById("createAccountLink").style.display = "none";
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("logoutLink").style.display = "";
    if (userrole === "admin") {
      document.getElementById("allDataLink").style.display = "";
      document.getElementById("manageUserLink").style.display = "";
    }
  } else {
    document.getElementById("createAccountLink").style.display = "";
    document.getElementById("loginLink").style.display = "";
    document.getElementById("logoutLink").style.display = "none";
    document.getElementById("allDataLink").style.display = "none";
    document.getElementById("manageUserLink").style.display = "none";
  }
}
