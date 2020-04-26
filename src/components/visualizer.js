let start_pos = [10, 15];
let end_pos = [10, 35];
let observers = [];

function emitChange() {
  observers.forEach((o) => o && o(start_pos));
}
export function observe(o) {
  observers.push(o);
  emitChange();
  return () => {
    observers = observers.filter((t) => t !== o);
  };
}
export function canMoveStart(toX, toY) {
  const [x, y] = start_pos;
  return x !== end_pos[0] && y !== end_pos[1];
}
export function moveStart(toX, toY) {
  start_pos = [toX, toY];
  emitChange();
}
