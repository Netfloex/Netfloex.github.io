var can = d("#canvas")
var c = can.getContext("2d")

var warp = new WarpSpeed("canvas");

var def = warp.TARGET_SPEED
resize()

function resize() {
  can.width = innerWidth
  can.height = innerHeight
}

var clicks = [new Date()]
var start = new Date()
function updateBackground() {
  clicks.push(new Date())
}
function loop() {
  var time = (new Date() - clicks[0])/1000
  var cps = clicks.length/time
  if (cps) {
    warp.TARGET_SPEED = def + 2*cps
  }
  if (clicks.length>10) {
    clicks.shift()
  }
}
setInterval(loop, 100)
addEventListener("resize", resize)
