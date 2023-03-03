let userContext = React.useContext(UserContext);

function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        userContext.email ? (
          show ? (
            <WithdrawForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <WithdrawMsg setShow={setShow} setStatus={setStatus} />
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

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <b>Final Balance: {userContext.balance}</b>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
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
  let balanceAmount = userContext.balance;
  function handle() {
    if (amount <= 0) {
      alert("Enter a positive number");
      return false;
    }
    if (Number(amount) > Number(balanceAmount)) {
      alert("Enter amount less than current balance");
      return false;
    }
    fetch(`/account/update/${email}/-${amount}`, options)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          userContext.balance = data.value.balance;
          props.setStatus(JSON.stringify(data.value));
          props.setShow(false);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus("Withdrawal failed");
          console.log("err:", text);
        }
      });
  }

  return (
    <>
      <b>Current Balance: {userContext.balance}</b>
      <br />
      <br />
      Enter Amount to Withdraw:
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
        Withdraw
      </button>
    </>
  );
}
