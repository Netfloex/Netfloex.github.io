var player = new Player()
var Create = {}
var game = {}
game.inventory = {
}

var animals = []
for (var i = 0; i < 4; i++) {
  animals.push(new Animal("sheep"))
  animals.push(new Animal("cow"))
}
var items = []
var bubbles = []

aEL("resize", function () {
  ter.block.width = can.width/16
  player.rpos = {x:0,y:0}
  ww = (blocks)*ter.block.width
})
function loop() {
  if (Object.keys(Create).length<7) {
    return requestAnimationFrame(loop)
  }
  clear()
  Create.terrain()
  Create.bubbles()
  Create.player()
  Create.overlay()
  Create.animals()
  Create.items()
  Create.inventory()
  if (mouse.which) {
    mousehold()
  }
  if (running) {
    requestAnimationFrame(loop)
  }
}
aEL("load", function () {
  d("#loading").remove()
  loop()
})
function createEl(elem, parent, klass) {
  var e = parent.querySelector(elem)
  if (klass) {
    e = parent.querySelector(`.${klass}`)
  }
  if (!e) {
    e = document.createElement(elem)
    parent.appendChild(e)
    if (klass) {
      e.className = klass
    }
  }
  return e
}
