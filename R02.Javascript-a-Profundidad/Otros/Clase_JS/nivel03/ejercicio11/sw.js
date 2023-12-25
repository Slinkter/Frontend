self.addEventListener("install", (e) => {
  console.log("instalando service worker");
});

self.addEventListener("activate", () => {
  console.log("servicio de worker esta activo");
});

self.addEventListener("fetch", () => {
  console.log("service woker interceptando peticion");
});

self.addEventListener("message", (e) => {
  console.log("(SW) Mensaje recibo del navegador :");
  console.log(e.data);
  e.source.postMessage(" (SW) esto es un mensaje de respuesta")
});


