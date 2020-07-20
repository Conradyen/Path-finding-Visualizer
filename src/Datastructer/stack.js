export function stack() {
  this.items = [];
}

stack.prototype = {
  isEmpty: function () {
    return this.items.length === 0;
  },
  push: function (element) {
    this.items.push(element);
  },

  pop: function () {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  },
  peek: function () {
    return this.items[this.items.length - 1];
  },
};
