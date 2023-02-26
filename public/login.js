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

  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
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
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          let userName = document.getElementById("userName");
          userName.innerHTML = email;
          //document.getElementById("logoutLink").classList.remove("disabled");
          document.getElementById("createAccountLink").style.display = "none";
          document.getElementById("loginLink").style.display = "none";
          document.getElementById("logoutLink").style.display = "";

          props.userCtx.currentUser = data;
          props.setStatus("");
          props.setShow(false);
          console.log("JSON:", data);
          console.log("currentUser: ", props.userCtx.currentUser);
        } catch (err) {
          props.setStatus(text);
          console.log("err:", err + "data: " + text);
        }
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
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
    </>
  );
}
