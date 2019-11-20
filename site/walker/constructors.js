function Player() {
  this.pos = {
    x: 0,
    y: 0
  }
  this.rpos = {
    x: 0,
    y: 0
  }
  this.motion = {
    x: 0,
    y: 0
  }
  this.rotation = 0
  this.applyForce = function (mot) {
    var motX = mot.x || 0
    var motY = mot.y || 0
    if (((player.pos.x==0&&this.rpos.x<0)||(this.pos.x<-ww/2&&player.rpos.x>0))&&Math.abs(motX)>.1) {
      this.rpos.x -= motX/2
      var noX = true
    }
    if (((player.pos.y==0&&this.rpos.y<0)||(this.pos.y<-ww/2&&player.rpos.y>0))&&Math.abs(motY)>.1) {
      this.rpos.y -= motY/2
      var noY = true
    }
    if (!noX) {
      this.pos.x += motX
    }
    if (!noY) {
      this.pos.y += motY
    }
    this.applyFriction()
  }
  this.applySpeed = function (mot) {
    if (mot.x) {
      this.motion.x += mot.x
    }
    else if (mot.y) {
      this.motion.y += mot.y
    }
  }
  this.applyMotion = function () {
    this.applyForce(this.motion)
  }
  this.applyFriction = function () {
    this.motion.x *= .9
    this.motion.y *= .9
  }
  this.speed = 1
}
function Tree() {
  var x = random(0,ter.width)
  this.type = "tree"
  this.img = img.tree
  this.color = `hsl(${x*10}, 50%, 50%)`
  this.bgColor = `hsl(${x*10}, 50%, 50%)`
  this.opacity = 1;
  this.hp = 10
  this.x = x
  this.y = random(0,ter.height)
}
function Cow() {
  this.x = random(100, ww-100)
  this.y = random(100, ww-100)
  this.rotation = random(0,360)
  this.hp = 5
  this.img = img.cow
  this.ai = {
    rotateSpeed: random(-10,10)/10,
    time: new Date(),
    speed : {
      x: 0,
      y: 0
    }
  }
  this.randomAi = function () {
    var idle = random(0,1)
    if (!idle) {
      this.ai.speed = {
        x: random(-2, 2),
        y: random(-2, 2)
      }
    } else {
      this.ai.speed = {
        x: 0,
        y: 0
      }
      this.ai.rotateSpeed = random(-100,100)/100
      this.rotation = random(0,360)
    }
    this.ai.time = new Date()
  }
}
