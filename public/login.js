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
  console.log("currentUser: ", props.userCtx.currentUser);

  function authenticateAgain() {
    props.setShow(true);
    auth.signOut();
    Logout();
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
          //let accessToken, refreshToken;
          console.log("text", text);
          //const { accessToken, refreshToken, data } = JSON.parse(text);
          let jsonvalue = JSON.parse(text);
          console.log("access token:" + jsonvalue.accessToken);
          console.log("refresh token:" + jsonvalue.refreshToken);

          Cookies.set("bearerToken", jsonvalue.accessToken);
          console.log("parse data:" + jsonvalue.user[0].email);
          console.log("parse data user:" + jsonvalue.user[0]);
          let userName = document.getElementById("userName");
          userName.innerHTML = email;
          //document.getElementById("logoutLink").classList.remove("disabled");
          document.getElementById("createAccountLink").style.display = "none";
          document.getElementById("loginLink").style.display = "none";
          document.getElementById("logoutLink").style.display = "";

          props.userCtx.currentUser = jsonvalue.user[0];
          props.setStatus("");
          props.setShow(false);
          //console.log("JSON:", data);
          console.log("currentUser: ", props.userCtx.currentUser);
        } catch (err) {
          props.setStatus(text);
          console.log("err:", err + "data: " + text);
        }
      });
  }
  function googleLoginHandle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log("google sign in clicked");

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        //this gives you a google Access Token. You can use it to access the Google API
        console.log("google sign in clicked2");

        const credential = result.credential;
        console.log("google sign in clicked3");

        const token = credential.accesstoken;
        console.log("google sign in clicked24");

        // The signed-in user info
        const user = result.user;
        console.log(user);
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
  }
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      console.log(
        `You are logged in using the following email: ${firebaseUser.email}`
      );

      googlelogin.style.display = "none";
      let userName = document.getElementById("userName");
      userName.innerHTML = email;
      //document.getElementById("logoutLink").classList.remove("disabled");
      document.getElementById("createAccountLink").style.display = "none";
      document.getElementById("loginLink").style.display = "none";
      document.getElementById("logoutLink").style.display = "";
      props.setStatus("");
      props.setShow(false);
    } else {
      console.log("User is not logged in");
      //loggedInStatus.innerText = "You are not yet logged in";

      googlelogin.style.display = "inline";
      //password.style.display = "inline";
      logout.style.display = "none";
    }
  });

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
      </button>
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
