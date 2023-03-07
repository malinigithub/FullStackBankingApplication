function NavBar() {
  const userCtx = React.useContext(UserContext);
  //console.log(userCtx);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a
        className="navbar-brand"
        data-toggle="tool-tip"
        data-placement="bottom"
        title="Home Page"
        href="#"
      >
        BadBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Deposit money here"
              href="#/deposit/"
            >
              Deposit
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Withdraw money here"
              href="#/withdraw/"
            >
              Withdraw
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Check your balance"
              href="#/balance/"
            >
              Balance
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tooltip"
              data-placement="bottom"
              title="View allData"
              id="allDataLink"
              href="#/alldata/"
              style={{ display: "none" }}
            >
              All Data
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Admin page - Update Member Role"
              id="manageUserLink"
              href="#/manageuser/"
              style={{ display: "none" }}
            >
              Manager Member Role
            </a>
          </li>
        </ul>
      </div>

      <div id="userName"></div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="tool-tip"
            data-placement="bottom"
            title="Create Account"
            href="#/CreateAccount/"
            id="createAccountLink"
          >
            Create Account
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="tool-tip"
            data-placement="bottom"
            title="Click here to Login"
            href="#/login/"
            id="loginLink"
          >
            Login
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="tool-tip"
            data-placement="bottom"
            title="Click here to Logout"
            href="#/logout/"
            id="logoutLink"
            style={{ display: "none" }}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}
