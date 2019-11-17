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
// Als je resized doet dit kut

var gradient = c.createLinearGradient(0, 0, can.width, 0);
var drawColor = gradient
gradient.addColorStop("0", "#667eea");
gradient.addColorStop("1.0", "#764ba2");
var gradientColor = c.createLinearGradient(0, 0, can.width, 0);

gradientColor.addColorStop("0", "red");
gradientColor.addColorStop("0.17", "#ff0");
gradientColor.addColorStop("0.33", "lime");
gradientColor.addColorStop("0.50", "cyan");
gradientColor.addColorStop("0.66", "blue");
gradientColor.addColorStop("0.83", "#ff0");
gradientColor.addColorStop("1", "red");

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
    if (dist(d.x,d.y,can.width, 200)<500) {
      overlayClass.add("hidden")
    } else {
      overlayClass.remove("hidden")
    }
    if (drawing.length>2) {
      drawing.shift()
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
function saveForUndo() {
  console.log("save");
  undoImage.push(c.getImageData(0, 0, can.width, can.height))
}

var colors = Array.from(document.querySelectorAll(".color"))
d("#picker").addEventListener("change", function (e) {
  drawColor = this.value
})
var colorMap = {
  gradient: gradient,
  colors: gradientColor,
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
var customPan = new ZingTouch.Pan({
  threshold: 1
});
var startPan = customPan.start

customPan.start = function (inputs) {
  if (inputs[0].initial.originalEvent.target==can) {
    saveForUndo()
  }
  return startPan.call(this, inputs)
}
customPan.end = function (e) {
  // Als je op menuutje klikt moet hij niet teken e.target
  if (e[0].current.originalEvent.target==can) {
    var pos = e[0].current
    arc(pos.x,pos.y,20, drawColor)
  }
  drawing = []
  overlayClass.remove("hidden")
}
var zt = new ZingTouch.Region(document.body);
zt.bind(can, customPan, function(e){
  var pos = e.detail.events[0]
  if (pos.x&&pos.y) {
    var cursor = {
      x: pos.x,
      y: pos.y,
      time: new Date()
    }
    drawing.push(cursor)
  }
});
