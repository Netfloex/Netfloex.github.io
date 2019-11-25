var player = new Player()
var Create = {}
var game = {
  wood: 0,
  cow: 0
}

var animals = [
  new Cow(),new Cow(),new Cow(),new Cow(),new Cow(),new Cow(),
  new Cow(),new Cow(),new Cow(),new Cow(),new Cow(),new Cow()
]
var items = []
var bubbles = []
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
