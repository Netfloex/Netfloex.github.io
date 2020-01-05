var player = new Player()
var Create = {}
var game = {
  inventory: {},
  money: 0
}


var animals = []
var items = []
var bubbles = []

aEL("resize", function () {
  ter.block.width = can.width/16
  player.rpos = {x:0,y:0}
  ww = (blocks)*ter.block.width

  animals.forEach(an => {
    var c = toCoords(an.tile)
    an.x = c.x
    an.y = c.y
  })
})
function loop() {
  if (Object.keys(Create).length<8) {
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
  Create.market()

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
    e = parent.querySelector(`${elem}.${klass}`)
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
