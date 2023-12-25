if (navigator.serviceWorker) {
  navigator.serviceWorker.register("sw.js");
}

navigator.serviceWorker.ready.then((res) =>
  res.active.postMessage("(Navigator)el mensaje sera enviado al sw ")
);

// para que el servidor responsa
navigator.serviceWorker.addEventListener("message", (e) => {
  console.log("(Navigator) hemos recibio un mensaje del sw y esto es : ");
  console.log(e.data);
});
