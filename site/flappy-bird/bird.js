var can = d("#canvas")
var c = can.getContext("2d")

function resize() {
  can.height = innerHeight
  can.width = innerWidth
}
var running = true
resize()
addEventListener("resize", resize)
var img = {}
img.sand = newImage("sand")
img.bird = newImage("bird")
img.pipe = newImage("pipe")
img.pipep = newImage("pipepiece")
img.pipeu = newImage("pipeu")

var keyState = {};

var minChange = 100;
var maxChange = 300

var ls = localStorage
function Bird() {
  this.pos = {
    x: can.width/2,
    y: can.height/2
  }
  this.score = 0
  this.scoreRaw = 0
  this.speed = 10
  this.motion = {
    y: -5
  }
  this.gravity = {
    y: .25
  }
  this.fly = {
    y: -4
  }
  this.rotation = 0
  this.applyMovement = function (speed) {
    this.pos.y += speed.y
  }
  this.applyForce = function (speed) {
    this.motion.y += speed.y
  }
  this.setForce = function (speed) {
    Object.assign(this.motion, speed)
  }
  this.draw = function () {
    var w = 100
    this.pos.x = 100
    c.save()
    c.translate(this.pos.x, this.pos.y)
    rotate(this.rotation)
    image(img.bird, -w/2, -w/2, w, w)
    // arc(0, 0, 10)
    c.restore()
    this.applyMovement(this.motion)
  }
}
function Paal(i) {
  this.x = lastPaal.x + 800
  var y = lastPaal.y
  if (random(0, 1)) {
    y += random(minChange,maxChange)
  } else {
    y -= random(minChange,maxChange)
  }
  if (y<200) {
    y = 200 + random(0,200)
  }
  if (y>can.height-300) {
    y = can.height-300 - random(minChange, maxChange)
  }
  this.y = y
  this.height = 200,
  this.width = 100
  this.done = false
  this.draw = function () {
    var y = this.y + this.height
    image(img.pipep, this.x, 0, this.width, this.y)
    image(img.pipeu, this.x, this.y-this.height+17, this.width, img.pipeu.height/img.pipeu.width*this.width)
    // rect(this.x, this.y+this.height, this.width, can.height, "green")
    var h = img.pipe.height/img.pipe.width*this.width
    image(img.pipep, this.x, y, this.width, can.height)
    image(img.pipe, this.x, y, this.width, h)
  }
  lastPaal = this
}

dead()

function loop() {
  clear()
  createBackground()
  bird.applyForce(bird.gravity)
  bird.draw()
  bird.speed+=.001
  var by = bird.motion.y
  bird.rotation = bird.motion.y*4
  var r = ls.getItem("birdScore")
  if (!r) {
    r = 0
  }
  if (bird.score>r) {
    ls.setItem("birdScore", bird.score)
  }
  d("#score").innerHTML = `Highscore: ${r}<br>Score: ${bird.score}`
  if (bird.pos.y>can.height||bird.pos.y<=30) {
    dead()
  }
  palen.forEach((paal, i)=> {
    paal.x -= bird.speed
    if (paal.x<-100) {
      palen.splice(i, 1)
      palen.push(new Paal(1))
    }
    paal.draw()
    var obj = {}
    Object.assign(obj, paal)
    obj.y = 0
    obj.height = can.height
    if (isHitbox(bird.pos, obj)) {
      if (!isHitbox(bird.pos, paal)) {
        dead()
      } else {
        if (!paal.done) {
          paal.done = true
          bird.score++
        }

      }
    }
  })
  if (running) {
    requestAnimationFrame(loop)
  }
}

function dead() {
  lastPaal = {y: can.height/2, x: can.width}
  bird = new Bird()
  palen = []
  palen.push(new Paal(1))
  palen.push(new Paal(2))
  palen.push(new Paal(3))
  palen.push(new Paal(4))
  bird = new Bird()
}
var max = 10
function click(e) {
  var fly = {}
  Object.assign(fly, bird.fly)
  if (typeof e == "object") {
    // e.preventDefault()
  }
  // if (typeof e == "number") {
  //   fly.y *= .3
  //   // console.log(fly);
  // }
  if (bird.motion.y>0) {
    bird.setForce(fly)
  } else {
    bird.applyForce(fly)
    if (bird.motion.y<-max) {
      bird.motion.y= -max
    }
  }
}

var x =  can.width
function createBackground() {
  var w = can.width
  x+= -bird.speed * 0.7
  image(img.sand, x , 0 , w, can.height)
  c.save()
  c.translate(x ,0)
  c.scale(-1, 1)
  image(img.sand,0,0, w,  can.height)
  c.restore()
  image(img.sand, can.width*2+ x , 0 , w, can.height)
  c.save()
  c.translate(can.width*2+x ,0)
  c.scale(-1, 1)
  image(img.sand,0,0, w,  can.height)
  c.restore()
  if (x<-w*2) {
    x= 0
  }
}
addEventListener("load", loop)

addEventListener("mousedown", click)
addEventListener("keydown", click)
function isHitbox(point,obj) {
  // rect(obj.x,obj.y,obj.width,obj.height,"aqua")
  // arc(point.x,point.y,100)
  if (point.x>obj.x) {
    if (point.y>obj.y) {
      if (point.x<obj.x+obj.width) {
        if (point.y<obj.y+obj.height) {
          return true
        }
      }
    }
  }
  return false
}
var zt = new ZingTouch.Region(document.body);


var tap = new ZingTouch.Tap({
    maxDelay: 1000,
    tolerance: 50
})

zt.bind(can, tap, function(e){
  click()
}, false);
