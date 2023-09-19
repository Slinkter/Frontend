const array = ["diego", "karen", "oscar"];
console.log(array[1]);

// creacion de un array

class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  get(index) {
    return this.data[index];
  }
  push(item) {
    this.data[this.lenght] = item;
    this.length++;
    return this.data;
  }
  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }
  delete(index) {
    const item = this.data[index];
    this.shiftIndex(index);
    return item;
  }

  shiftIndex(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }
}

const myArray = new MyArray();
myArray.push("ana");
console.log(myArray);
myArray.push("ariana");
console.log(myArray);
console.log(myArray.length);
console.log(myArray.get(1));
myArray.pop();
console.log(myArray);

/* Clase 11/29 */

/* Clase 12/29 */

/* Clase 15/29 : Linked List
 */

/* Clase 21/29 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.lenght = 0;
  }

  peek() {
    return this.top;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.lenght === 0) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      const holdingPointer = this.top;
      this.top = newNode;
      this.top.next = holdingPointer;
    }
    this.lenght++;
    return this;
  }
}

const myStack = new Stack();
console.log(myStack.push(1));
