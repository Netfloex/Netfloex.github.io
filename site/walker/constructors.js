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

  this.selected = false
}
function Tree() {
  var x = random(1,ter.width-2)
  this.type = "tree"
  this.img = img.tree
  this.color = `hsl(${x*10}, 50%, 50%)`
  this.opacity = 1;
  this.hp = 10
  this.x = x
  this.y = random(1,ter.height -2)
}
function Tile(type) {
  this.hp = 4
  this.type = type
  this.img = img[type]
}
function Item(x, y, type) {
  this.x = x
  this.y = y
  this.type = type
  if (type == "wood") {
    type = "log"
  }
  this.img = img[type]
  this.rotation = 0
  this.collect = function () {
    var diz = this
    var div = crEL("div")
    div.className = "item"
    div.style.left = `${this.x + player.pos.x  - 50}px`
    div.style.top = `${this.y + player.pos.y  - 50}px`
    div.style.backgroundImage = `url(img/${type}.png)`
    d("#items").appendChild(div)
    setTimeout(function () {
      div.classList.add("toHotbar")
      if (diz.type == "wood") {
        div.style.left = `calc(50% - 150px)`
      }
      if (diz.type == "cow") {
        div.style.left = `calc(50% - 50px)`
        div.style.marginTop = `-1rem`
      }
    })
    setTimeout(function () {
      game[diz.type]++

    },900)
    setTimeout(function () {
      div.remove()
    },1000)
  }
}
function Cow() {
  this.x = random(100, ww-100)
  this.y = random(100, ww-100)
  this.rotation = random(0,360)
  this.hp = 5
  this.img = img.cow
  this.ai = {
    runFromPlayer : false,
    rotateSpeed: random(-10,10)/10,
    time: new Date(),
    speed : {
      x: 0,
      y: 0
    }
  }
  this.getAngle = function(){
    var angle = Math.atan2(this.ai.speed.y, this.ai.speed.x);
    var degrees = 180*angle/Math.PI;
    return (360+Math.round(degrees))%360 + 90;
  }
  this.setAngle = function(degree){
    var l = 5
    degree-=90
    var angle = degree*Math.PI/180;
    this.ai.speed.x=Math.cos(angle)*l;
    this.ai.speed.y=Math.sin(angle)*l;
    return;
  }
  this.randomAi = function () {
    var idle = random(0,1)
    if (!idle) {
      this.ai.speed = {
        x: random(-2, 2),
        y: random(-2, 2)
      }
      this.rotation = this.getAngle()
    } else {
      this.ai.speed = {
        x: 0,
        y: 0
      }
      this.ai.rotateSpeed = random(-100,100)/100
    }
    this.ai.time = new Date()
  }
}
