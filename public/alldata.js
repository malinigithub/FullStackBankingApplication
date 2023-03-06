function AllData() {
  const [data, setData] = React.useState("");

  let bearerToken = Cookies.get("bearerToken");
  let token = "Bearer " + bearerToken;

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
