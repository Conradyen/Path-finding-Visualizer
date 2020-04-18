export function queue() {
  this.items = [];
}

queue.prototype = {
  isEmpty: function () {
    return this.items.length === 0;
  },
  enqueue: function (element) {
    this.items.push(element);
  },
  dequeue: function () {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  },
  clear: function () {
    this.items = [];
  },
};
