function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  let userCtx = React.useContext(UserContext);

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm
            setShow={setShow}
            setStatus={setStatus}
            userCtx={userCtx}
          />
        ) : (
          <CreateMsg
            setShow={setShow}
            setStatus={setStatus}
            userCtx={userCtx}
          />
        )
      }
    />
  );
}

function CreateMsg(props) {
  function addAnotherAccount() {
    props.setShow(true);
    Cookies.remove("bearerToken");
    Cookies.remove("gToken");
    auth.signOut();
    uiUpdates("", false, "");

    props.userCtx.currentUser = [, , ,];
    //console.log("reauth logout: ", props.userCtx.currentUser);
  }
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={addAnotherAccount}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handle() {
    if (!name || !email || !password) {
      props.setStatus("Error: Please enter all the three fields");
      alert("Please enter all the three fields");
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      props.setStatus("Error: Enter valid email id");
      alert("Enter valid email id");
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }
    if (password.length < 8) {
      props.setStatus("Error: Password must be 8 characters");
      alert("Password must be 8 characters");
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }
    //console.log(name, email);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        //console.log("firebase user created", user);
        //console.log("firebase usercredential", userCredential);
        //console.log("uid as gtoken? ", userCredential.user.uid);

        Cookies.set("gToken", userCredential.user.uid);
        const url = `/account/create/${name}/${email}`;
        fetch(url)
          .then((response) => response.text())
          .then((text) => {
            try {
              if (text === "User already exists") {
                props.setStatus("Error: User " + email + " already exists");
                alert("Error: User " + email + " already exists");
                setTimeout(() => props.setStatus(""), 3000);
                props.setShow(true);
              } else {
                let jsonvalue = JSON.parse(text);
                Cookies.set("bearerToken", jsonvalue.accessToken);

                props.userCtx.currentUser = jsonvalue.user;

                uiUpdates(props.userCtx.currentUser.userrole, true, email);
                props.setStatus("User " + email + " successfully created");
                setTimeout(() => props.setStatus(""), 3000);

                props.setShow(false);
              }
            } catch (err) {
              props.setStatus("Error occurred");
              console.log("err:", err + "data: " + text);
            }
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        //let statusText;
        // ..
        console.log("firebase user error", error);
        props.setStatus("Error: " + errorMessage);
        alert(errorMessage);
        setTimeout(() => props.setStatus(""), 3000);
        return false;
      });
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
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
        Create Account
      </button>
    </>
  );
}
