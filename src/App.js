import authentication from "./auth";

const init = async () => {
  await authentication.create();
  let authClient = authentication.client;

  await new Promise(async (resolve, reject) => {
    authClient.login({
      onSuccess: async (e) => {
        let key = await authClient._storage.get("identity");
        let chain = await authClient._storage.get("delegation");
        let body = { key, chain };
        fetch("/key", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((x) => {
          window.close();
        });
      },
      onError: reject,
    });
  });
};

init();

function App() {
  return (
    <div className="App">
      Redirecting to Internet Identity. <br />
      Allow popups.
      <br /> (top right corner in address bar)
    </div>
  );
}

export default App;
