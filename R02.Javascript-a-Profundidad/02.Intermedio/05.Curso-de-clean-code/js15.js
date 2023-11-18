// ES6
const getResult = () => "Resulst";
console.log(getResult());

[1, 2, 3].map((n) => n * 2);

const counter = {
  number: 0,
  increase() {
    setInterval(() => {
      console.log(++this.number);
    }, 1000);
  },
};

counter.increase();
