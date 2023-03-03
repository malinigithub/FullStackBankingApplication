const firebaseConfig = {
  apiKey: "AIzaSyCQ_K1_nHf87Ba-J3vNn5nTwO88SUbjL88",
  authDomain: "bankingappauth-edba5.firebaseapp.com",
  projectId: "bankingappauth-edba5",
  storageBucket: "bankingappauth-edba5.appspot.com",
  messagingSenderId: "610924863185",
  appId: "1:610924863185:web:1bdc7483b1a7f2cfc16ff0",
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
console.log("auth ", firebase.auth());
function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  let userCtx = React.useContext(UserContext);

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm
            setShow={setShow}
            setStatus={setStatus}
            userCtx={userCtx}
          />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} userCtx={userCtx} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  //console.log("currentUser: ", globalUserCtx.currentUser);

  function authenticateAgain() {
    props.setShow(true);
    Cookies.remove("bearerToken");

    auth.signOut();
    //Logout();
  }
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={authenticateAgain}
      >
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handle() {
    if (!email || !password) {
      props.setStatus("Error: Missing data");
      alert("Please enter all the information");
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          console.log("text", text);
          let jsonvalue = JSON.parse(text);

          Cookies.set("bearerToken", jsonvalue.accessToken);

          document.getElementById("createAccountLink").style.display = "none";
          document.getElementById("loginLink").style.display = "none";
          document.getElementById("logoutLink").style.display = "";

          props.userCtx.currentUser = jsonvalue.user[0];
          let userName = document.getElementById("userName");
          userName.innerHTML = email;
          props.setStatus("");
          props.setShow(false);
        } catch (err) {
          props.setStatus(text);
          console.log("err:", err + "data: " + text);
        }
      });
  }
  function googleLoginHandle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    //    console.log("google sign in clicked");
    let googleemail;
    let googleDisplayName;

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        //this gives you a google Access Token. You can use it to access the Google API
        //console.log("google sign in clicked2");

        const credential = result.credential;
        const token = credential.accesstoken;
        // The signed-in user info
        const user = result.user;
        googleemail = user.email;
        googleDisplayName = user.displayName;
        console.log(
          "token after google login: ",
          result.credential.accessToken
        );
        //setEmail(googlemail);
        //console.log("user after google login: set emai:  ", email);
        fetch(`/account/googlelogin/${googleemail}/${googleDisplayName}`)
          .then((response) => response.text())
          .then((text) => {
            try {
              //console.log("fetch googlelogin in signup call");

              let jsonvalue = JSON.parse(text);

              Cookies.set("bearerToken", jsonvalue.accessToken);

              document.getElementById("createAccountLink").style.display =
                "none";
              document.getElementById("loginLink").style.display = "none";
              document.getElementById("logoutLink").style.display = "";
              console.log("before setting globalUserCtx");

              //userContext = jsonvalue.foundUser;
              props.userCtx.currentUser = jsonvalue.foundUser;
              //console.log("after current user extraction", userContext);
              console.log(
                "after current user extraction props.userCtx.currentUser",
                props.userCtx.currentUser
              );

              let userName = document.getElementById("userName");
              userName.innerHTML = googleemail;
              props.setStatus("");
              props.setShow(false);
            } catch (err) {
              props.setStatus(text);
              console.log("err:", err + "data: " + text);
            }
          });
      })
      .catch((error) => {
        //Handle Errors here
        console.log("google sign in clicked== ERROR flow");

        const errorCode = error.code;
        const errorMessage = error.messagingSenderId;

        //The email of the user's account used
        //const email = error.customData.email;
        //The AuthCredential type that was used.
        // const credential =firebase.auth.GoogleAuthProvider.credentialFromError(error);

        console.log(error, errorCode, errorMessage, email);
      });
    // console.log("end of googlelogin  function", props.userCtx.currentUser);
  }
  /*   auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(
        `You are logged in using the following email: ${firebaseUser.email}`
      );

      props.setStatus("");
      props.setShow(false);
    } else {
      console.log("User is not logged in");
    }
  }); */

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value.toLowerCase())}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Login
      </button>{" "}
      &nbsp;
      <button
        id="googlelogin"
        className="btn btn-light"
        onClick={googleLoginHandle}
      >
        Google Login
      </button>
    </>
  );
}
