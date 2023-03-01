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
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
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
    console.log(name, email, password);
    console.log("mongoDB changes included");
    const url = `/account/create/${name}/${email}/${password}`;
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        try {
          //if (res.status === 403) {
          if (text === "User already exists") {
            props.setStatus("Error: User " + email + " already exists");
            alert("Error: User " + email + " already exists");
            setTimeout(() => props.setStatus(""), 3000);
            props.setShow(true);
          } else {
            const data = JSON.parse(text);

            console.log(data);
            let userName = document.getElementById("userName");
            userName.innerHTML = email;
            //document.getElementById("logoutLink").classList.remove("disabled");
            document.getElementById("createAccountLink").style.display = "none";
            document.getElementById("loginLink").style.display = "none";
            document.getElementById("logoutLink").style.display = "";

            props.userCtx.currentUser = data;
            props.setStatus("User " + email + " successfully created");
            props.setShow(false);
          }
        } catch (err) {
          props.setStatus(text);
          console.log("err:", err + "data: " + text);
        }
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
