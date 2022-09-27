import authentication from "./auth";

const init = async () => {
  await authentication.create();
  let authClient = authentication.client;

  await new Promise(async (resolve, reject) => {
    authClient.login({
      onSuccess: async (e) => {
        let key = authClient._key._privateKey;

        fetch("/key", {
          method: "POST", // or 'PUT'
          body: key,
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
