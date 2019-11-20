var keymap = {}

var keyCodes = {
  w: `up`,
  a: `left`,
  s: `down`,
  d: `right`,
  ArrowUp: `up`,
  ArrowLeft: `left`,
  ArrowDown: `down`,
  ArrowRight: `right`,
}

aEL("keydown", keydown)
aEL("keyup", keyup)
function keydown(e) {
  keymap[e.key] = e.key
}
function keyup(e) {
  delete keymap[e.key]
}
