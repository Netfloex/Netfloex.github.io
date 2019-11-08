var can = d("#canvas")
var c = can.getContext("2d")

function resize() {
  can.width = innerWidth
  can.height = innerHeight
}
resize()
addEventListener("resize", resize)

var drawing = []

var gradient = c.createLinearGradient(0, 0, can.width, 0);
gradient.addColorStop("0", "#667eea");
gradient.addColorStop("1.0", "#764ba2");

function loop() {
  requestAnimationFrame(loop)
  if (drawing.length<1) {
    return
  }
  drawing.forEach(d=>{
    if ((new Date() - d.time)>400) {
      drawing.shift()
    }
  })
  if (drawing.length<1) {
    return
  }
  // clear()
  c.beginPath()
  c.moveTo(drawing[0].x, drawing[0].y)
  drawing.forEach(d=>{
    c.lineTo(d.x, d.y)
    c.strokeStyle = gradient
    c.lineWidth = 100
    c.stroke()
    // arc(d.x,d.y,10, "green")
  })
  // c.closePath()
}
loop()

var zt = new ZingTouch.Region(document.body);

zt.bind(can, "pan", function(e){
  console.log(e)
  var pos = e.detail.events[0]
  if (pos.x&&pos.y) {
    var cursor = {
      x: pos.x,
      y: pos.y,
      time: new Date()
    }
    drawing.push(cursor)
  }
}, false);
