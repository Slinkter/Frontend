const myGlobal = 0;

function myFunctions() {
  const x = 1;
  function parent() {
    const y = 2;
    function child() {
      console.log("y : ", y, " |  x : ", x, "  | myGlobal:", myGlobal);
    }
    return child();
  }
  return parent();
}
myFunctions();
