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

var undoImage = [c.getImageData(0, 0, can.width, can.height)]

var i = 0
var last = new Date()

function loop() {
  requestAnimationFrame(loop)
  if (drawing.length<1) {
    return
  }
  if ((new Date()-drawing[drawing.length-1].time)>10) {
    if ((new Date() - last)>100) {
      console.log("Stopped Drawing");
      undoImage.push(c.getImageData(0, 0, can.width, can.height))

    }
    last = new Date()
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
    c.lineWidth = 40
    c.stroke()
    // arc(d.x,d.y,10, "green")
  })
  // c.closePath()
}
loop()

addEventListener("keyup", function (e) {
  if (e.key="z") {
    if (undoImage.length<1) {
      clear()
      return
    }
    c.putImageData(undoImage.pop(), 0, 0);
  }
})
can.addEventListener("mouseup", function (e) {
  drawing = []
  console.log("e");
})
var zt = new ZingTouch.Region(document.body);
zt.bind(can, "pan", function(e){
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
