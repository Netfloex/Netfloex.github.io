var player = new Player()
var Create = {}
function loop() {
  if (!Create.terrain) {
    return requestAnimationFrame(loop)
  }
  clear()
  Create.terrain()
  Create.player()
  requestAnimationFrame(loop)
}
loop()
