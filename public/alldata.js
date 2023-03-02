function AllData() {
  const [data, setData] = React.useState("");
  //let cookie = document.cookie;
  //console.log("cookie" + cookie);
  //console.log("cookie" + cookie);
  let bearerToken = Cookies.get("bearerToken");
  console.log("bearatoken" + bearerToken);

  //let jsonvalue = JSON.parse(cookie);
  let token = "Bearer " + bearerToken;
  console.log("token" + token);

  const options = {
    headers: {
      Authorization: token,
    },
  };
  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

  return (
    <>
      <h5>All Data in Store:</h5>
      {data}
    </>
  );
}
