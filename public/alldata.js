function AllData() {
  const [data, setData] = React.useState("");
  const userCtx = React.useContext(UserContext);
  const [status, setStatus] = React.useState("");

  function displayData() {
    let bearerToken = Cookies.get("bearerToken");
    let token = "Bearer " + bearerToken;
    let userData;
    const options = {
      headers: {
        Authorization: token,
      },
    };
    // fetch all accounts from API

    fetch("/account/all", options)
      .then((response) => response.json())
      .then((data) => {
        userData = data.map((user) => {
          return (
            <>
              <tr>
                <td>{user.authType}</td>
                <td>{user.userrole}</td>
                <td>{user.email}</td>
              </tr>
            </>
          );
        });

        setData(userData);
        //return userData;
        //setStatus(userData);
        //let allData = document.getElementById("allData");
        //allData.innerHTML = userData;

        //allData.innerHTML = JSON.stringify(userData);
      });
  }
  return (
    <>
      {userCtx.currentUser.email ? (
        <>
          <button type="submit" className="btn btn-dark" onClick={displayData}>
            View Data
          </button>
          <h5>All Data in Store:</h5>
          <table>
            <thead>
              <tr>
                <th>Auth Type</th>
                <th>User Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{data || "click button to view data"}</tbody>
          </table>
        </>
      ) : (
        <b>
          Please&nbsp;
          <a
            data-toggle="tool-tip"
            data-placement="bottom"
            title="Login"
            href="#/login/"
          >
            Login&nbsp;
          </a>{" "}
          first to view members
        </b>
      )}
    </>
  );
}
