function Balance() {
  const userCtx = React.useContext(UserContext);
  const currentUser = userCtx.currentUser;
  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        currentUser.name ? (
          <>
            <h3>
              Welcome <b>{userCtx.currentUser.name}</b>
            </h3>
            You have ${currentUser.balance} in your account
          </>
        ) : (
          <b>
            Please{" "}
            <a
              data-toggle="tool-tip"
              data-placement="bottom"
              title="Login"
              href="#/login/"
            >
              Login&nbsp;
            </a>{" "}
            first to view balance
          </b>
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState("");
  const [balance, setBalance] = React.useState("");

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(text);
          props.setShow(false);
          setBalance(user.balance);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus(text);
          console.log("err:", text);
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
      <button type="submit" className="btn btn-light" onClick={handle}>
        Check Balance
      </button>
    </>
  );
}
