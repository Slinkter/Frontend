const myGlobal = 0;

function myFunctions() {
  const x = 1;
  function parent() {
    const inner = 2;
    function child() {
      console.log("inner : ", inner, " |  x : ", x, "  | myGlobal:", myGlobal);
    }
    return child();
  }
  return parent();
}
myFunctions();
