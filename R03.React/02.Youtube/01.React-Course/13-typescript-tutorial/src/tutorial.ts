interface GenericInterface<T> {
  value: T;
  getValue: () => T;
}
const genericString: GenericInterface<string> = {
  value: "Hello world",
  getValue() {
    return this.value;
  },
};
