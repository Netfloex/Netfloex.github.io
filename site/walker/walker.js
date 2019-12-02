var player = new Player()
var Create = {}
var game = {}
game.inventory = {
  wood: 0,
  cow: 0,
  sheep: 0
}

var animals = []
for (var i = 0; i < 4; i++) {
  animals.push(new Animal("sheep"))
  animals.push(new Animal("cow"))
}
var items = []
var bubbles = []

aEL("resize", function () {
  ter.block.width = can.width/13
  player.rpos = {x:0,y:0}
  ww = (blocks)*ter.block.width
})
function loop() {
  if (Object.keys(Create).length<6) {
    return requestAnimationFrame(loop)
  }
  clear()
  Create.terrain()
  Create.bubbles()
  Create.player()
  Create.overlay()
  Create.animals()
  Create.items()

  if (mouse.which) {
    mousehold()
  }
  requestAnimationFrame(loop)
}
loop()
