const IDBRequest = window.indexedDB.open("db_data"); // crear o abrir base de datos

IDBRequest.addEventListener("success", () => {
  console.log("todo ok");
});
IDBRequest.addEventListener("error", () => {
  console.log("error");
});
IDBRequest.addEventListener("upgradeneeded", () => {
  console.log(" upgraded ");
});
