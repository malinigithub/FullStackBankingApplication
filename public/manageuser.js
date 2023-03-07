//let userContext = React.useContext(UserContext);

function ManagerUser() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  let userCtx = React.useContext(UserContext);

  return (
    <Card
      bgcolor="info"
      header="Manager User"
      status={status}
      body={
        userCtx.currentUser.email ? (
          show ? (
            <ManagerUserForm
              setShow={setShow}
              setStatus={setStatus}
              userCtx={userCtx}
            />
          ) : (
            <ManagerUserMsg
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
              first to manage members
            </b>
          </>
        )
      }
    />
  );
}

function ManagerUserMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <b>Member Role Updated</b>
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Update Another Member
      </button>
    </>
  );
}

function ManagerUserForm(props) {
  //const [email, setEmail] = React.useState("");
  const [memberEmail, setMemberEmail] = React.useState("");
  const [memberAuthType, setMemberAuthType] = React.useState("");
  const [memberRole, setMemberRole] = React.useState("");
  let email = props.userCtx.currentUser.email;
  //let authType = props.userCtx.currentUser.authType;
  let bearerToken = Cookies.get("bearerToken");
  let token = "Bearer " + bearerToken;

  const options = {
    headers: {
      Authorization: token,
    },
  };
  function handle() {
    fetch(
      `/account/updaterole/${memberAuthType}/${memberEmail}/${memberRole}`,
      options
    )
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);

          props.userCtx.currentUser.userrole = data.value.userrole;

          props.setStatus(
            "Member Role Updated to: " + props.userCtx.currentUser.userrole
          );
          props.setShow(false);
          //console.log("JSON:", data);
        } catch (err) {
          props.setStatus(
            "Role update failed: record not found, ensure correct authType is used"
          );
          console.log("err:", text);
        }
      });
  }

  return (
    <>
      Note: Member info is available in All Data page. Ensure that data matches
      <br />
      <br />
      Enter User Email:
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={memberEmail}
        onChange={(e) => setMemberEmail(e.currentTarget.value)}
      />
      <br />
      Enter Auth Type: <br />
      pwd or external only
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter authType"
        value={memberAuthType}
        onChange={(e) => setMemberAuthType(e.currentTarget.value)}
      />
      <br />
      Enter New Role: <br />
      admin or member only
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter Role"
        value={memberRole}
        onChange={(e) => setMemberRole(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Update Member Role
      </button>
    </>
  );
}
