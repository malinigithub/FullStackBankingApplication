function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  let userCtx = React.useContext(UserContext);

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        userCtx.currentUser.name ? (
          show ? (
            <DepositForm
              setShow={setShow}
              setStatus={setStatus}
              userCtx={userCtx}
            />
          ) : (
            <DepositMsg
              setShow={setShow}
              setStatus={setStatus}
              userCtx={userCtx}
            />
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
      <b>Final Balance: {props.userCtx.currentUser.balance}</b>
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
  let email = props.userCtx.currentUser.email;

  function handle() {
    if (amount <= 0 || amount > 15000) {
      alert("Enter an amount between 0 and 15000");
      props.setStatus("Enter an amount between 0 and 15000");

      return false;
    }
    fetch(`/account/update/${email}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.userCtx.currentUser.balance = data.value.balance;
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
      <b>Current Balance: {props.userCtx.currentUser.balance}</b>
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
