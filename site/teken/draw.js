var can = d("#canvas")
var c = can.getContext("2d")
var overlayClass =  document.querySelector("#overlay").classList
function resize() {
  can.width = innerWidth
  can.height = innerHeight
  if (undoImage.length) {
    c.putImageData(undoImage[undoImage.length-1], 0, 0);
  }
}
var undoImage = []
resize()
addEventListener("resize", resize)

var drawing = []

var drawMode = d("#drawMode")

var gradient = c.createLinearGradient(0, 0, can.width, 0);
var drawColor = gradient
gradient.addColorStop("0", "#667eea");
gradient.addColorStop("1.0", "#764ba2");


var i = 0
var last = new Date()

function loop() {
  requestAnimationFrame(loop)
  if (drawing.length<1) {
    return
  }
  // clear()
  if (drawMode.value=="both"||drawMode.value=="arc") {
    drawing.forEach(d=>{
        // c.lineWidth = .0001
        arc(d.x,d.y,20, drawColor)
    })
  }
  c.beginPath()
  c.moveTo(drawing[0].x, drawing[0].y)
  drawing.forEach(d=>{
    if (drawMode.value=="both"||drawMode.value=="line") {
      c.strokeStyle = drawColor
      c.lineWidth = 40
      c.lineTo(d.x, d.y)
      c.stroke()
    }
    if (dist(d.x,d.y,can.width, 400)<500) {
      overlayClass.add("hidden")
    } else {
      overlayClass.remove("hidden")
    }

  })
  // c.closePath()
}
loop()
d("#undoBtn").addEventListener("click", undo)
d("#clearBtn").addEventListener("click", clearCommand)
function clearCommand() {
  saveForUndo()
  clear()
}
addEventListener("keyup", function (e) {
  if (e.key=="z") {
    undo()
  }
  if (e.key=="Delete") {
    clearCommand()
  }
})
function undo() {
  if (undoImage.length<1) {
    clear()
    return
  }
  c.putImageData(undoImage.pop(), 0, 0);
}
can.addEventListener("mouseup", function (e) {
  drawing = []
  overlayClass.remove("hidden")
})
can.addEventListener("mousedown", saveForUndo)
function saveForUndo() {
  undoImage.push(c.getImageData(0, 0, can.width, can.height))
}

var colors = Array.from(document.querySelectorAll(".color"))
d("#picker").addEventListener("change", function (e) {
  drawColor = this.value
})
var colorMap = {
  gradient: gradient,
  red: "#f44336",
  blue: "#2196f3",
  green: "#009688"
}
colors.forEach(c=>{
  Object.keys(colorMap).forEach(cm=>{
    if (c.classList.value.match(cm)) {
      c.style.background = colorMap[cm]
    }
  })
  c.addEventListener("click", function () {
    Object.keys(colorMap).forEach(cm=>{
      if (c.classList.value.match(cm)) {
        drawColor = colorMap[cm]
      }
    })
  })
})
console.log(colors);
var zt = new ZingTouch.Region(can, false, false);
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
