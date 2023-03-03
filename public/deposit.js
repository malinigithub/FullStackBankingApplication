let userContext = React.useContext(UserContext);

function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  console.log("globalUserCtx inside deposit:", userContext);

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        userContext.email ? (
          show ? (
            <DepositForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <DepositMsg setShow={setShow} setStatus={setStatus} />
          )
        ) : (
          <>
            <b>
              Please{" "}
              <a
                data-toggle="tool-tip"
                data-placement="bottom"
                title="Login"
                href="#/login/"
              >
                Login&nbsp;
              </a>
              first to deposit
            </b>
          </>
        )
      }
    />
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <b>Final Balance: {userContext.balance}</b>
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  //const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  let email = userContext.email;
  let bearerToken = Cookies.get("bearerToken");
  let token = "Bearer " + bearerToken;

  const options = {
    headers: {
      Authorization: token,
    },
  };
  function handle() {
    if (amount <= 0 || amount > 15000) {
      alert("Enter an amount between 0 and 15000");
      props.setStatus("Enter an amount between 0 and 15000");

      return false;
    }
    fetch(`/account/update/${email}/${amount}`, options)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          userContext.balance = data.value.balance;
          props.setStatus(JSON.stringify(data.value));
          props.setShow(false);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus("Deposit failed");
          console.log("err:", text);
        }
      });
  }

  return (
    <>
      <b>Current Balance: {userContext.balance}</b>
      <br />
      <br />
      Enter Amount to Deposit:
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Deposit
      </button>
    </>
  );
}
