var player = new Player()
var Create = {}
var game = {
  wood: 0,
  cow: 0
}

var animals = [
  new Cow(),new Cow(),new Cow(),new Cow(),new Cow(),new Cow()
]
var items = []
function loop() {
  if (Object.keys(Create).length<5) {
    return requestAnimationFrame(loop)
  }
  clear()
  Create.terrain()
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
