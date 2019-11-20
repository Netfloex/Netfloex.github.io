var player = new Player()
var Create = {}
var game = {
  wood: 0,
  cow: 0
}

var animals = [
  new Cow(),new Cow(),new Cow(),new Cow(),new Cow(),new Cow()
]
function loop() {
  if (Object.keys(Create).length<4) {
    return requestAnimationFrame(loop)
  }
  clear()
  Create.terrain()
  Create.player()
  Create.overlay()
  Create.animals()
  requestAnimationFrame(loop)
}
loop()
