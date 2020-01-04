function Player() {
  this.pos = {
    x: 0,
    y: 0
  }
  this.rpos = {
    x: 0,
    y: 0
  }
  this.oldPos = {}
  this.oldRPos = {}
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
    var x = Math.atan2((mouse.screenY-(player.rpos.y+can.height/2)),
                      (mouse.screenX-(player.rpos.x+can.width/2)))*180/Math.PI
    player.rotation = x
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
    this.absPos = {
      x: -player.pos.x + player.rpos.x + (can.width/2),
      y: -player.pos.y + player.rpos.y + (can.height/2)
    }
    this.tile = {
      x: Math.floor((this.absPos.x/ter.block.width)),
      y: Math.floor((this.absPos.y/ter.block.width))
    }
  }
  this.speed = 1
  this.normalSpeed = 1
  this.selected = 0
  this.standMarket = false
  this.setAngle = function(degree, l){
    this.oldPos = {}
    this.oldRPos = {}
    var l = l || 5
    var angle = degree*Math.PI/180;
    this.motion.x=Math.cos(angle)*l;
    this.motion.y=Math.sin(angle)*l;
    return;
  }

  this.lastDont = 0
  this.timesDont = 0
  this.dont = function () {
    if (new Date() - this.lastDont<100) {
      this.timesDont++
      if (this.timesDont>10) {
        var tileCenter = toCoords(this.tile)
        var angle = Math.atan2((tileCenter.y-this.absPos.y),
                          (tileCenter.x-this.absPos.x))*180/Math.PI
        var degrees = angle
        var speed = this.timesDont/10
        this.setAngle(degrees, speed)
        this.rotation = degrees
      }
    } else {
      this.timesDont = 0
    }
    this.lastDont = new Date()
    if (typeof this.oldPos.x !== "undefined") {
      this.pos = this.oldPos
      this.rpos = this.oldRPos
    }
  }
}
function Tree() {
  var x = random(1,ter.width-2)
  this.type = "tree"
  this.img = img.tree
  this.opacity = 1;
  this.unwalkable = true
  this.hp = 10
  this.x = x
  this.y = random(1,ter.height -2)
}
function Water(x, y, corner) {
  this.x = x
  this.y = y
  this.type = "water"
  this.img = img["water"]
  if (corner) {
    var imag = undefined
    switch (corner) {
      case "tl":
        imag = img.waterCorner
        break;
      case "tr":
        imag = img.waterCornerR
        break;
      case "sl":
        imag = img.waterSide
        break;
      case "sr":
        imag = img.waterSideR
        break;
      case "dl":
        imag = img.waterCornerDL
        break;
      case "dr":
        imag = img.waterCornerDR
        break;
      case "dRev":
        imag = img.waterCornerDRev
        break;
      case "dRevDL":
        imag = img.waterCornerDLev
        break;
      case "dRevTL":
        imag = img.waterCornerTLev
        break;
      case "dRevTR":
        imag = img.waterCornerTRev
        break;
      default:
      imag = img.cow
    }
    this.img = imag
  }
}
function Tile(type, opt) {
  this.hp = 4
  this.type = type
  this.img = img[type]

  if (type == "seeds") {
    this.type = "wheat"
    this.hp = 2
    this.growth = 0
    this.plant = new Date()
  }
  if (opt) {
    if (opt.noHp) {
      delete this.hp
    }
    Object.assign(this, opt)
  }
  if (unwalkableTiles.includes(type)&&!opt.walkable) {
    this.unwalkable = true
  }
}
function Item(x, y, type) {
  var offset = ter.block.width / 25
  this.x = x + random(-offset, offset)
  this.y = y + random(-offset, offset)
  this.type = type
  this.img = img[type]
  this.world = terrain.type
  this.rotation = 0
  this.collect = function () {
    var diz = this
    var div = crEL("div")
    div.className = "item"
    div.style.left = `${this.x + player.pos.x  - 50}px`
    div.style.top = `${this.y + player.pos.y  - 50}px`
    div.style.backgroundImage = `url(${this.img.getAttribute("src")})`
    d("#items").appendChild(div)
    setTimeout(function () {
      div.classList.add("toHotbar")
      div.style.left = `calc(50% - 0px)`
      // div.style.marginTop = `-1rem`
    })
    setTimeout(function () {
      give(diz.type)

    },900)
    setTimeout(function () {
      div.remove()
    },1000)
  }
}
function Animal(type, pos, opt) {
  if (pos) {
    var x = pos.x
    var y = pos.y
  }
  this.x = x ||random(100, ww-100)
  this.y = y ||random(100, ww-100)
  Object.assign(this, opt)
  if (overworldAnimals.includes(type)) {
    this.world = terrain.type
  } else {
    this.world = "underworld"
  }
  if (hostileAnimals.includes(type)) {
    this.hostile = true
    this.bait = false
  } else {
    this.bait = "wheat"
    this.hostile = false
  }
  this.rotation = random(0,360)
  this.hp = 5
  this.type = type
  this.img = img[type]
  if (animalDrops[type]) {
    this.drops = animalDrops[type]
  } else {
    this.drops = false
    console.error(`${type} zit niet in animalDrops (variables.js)`);
  }
  this.ai = {
    runFromPlayer : false,
    rotateSpeed: random(-10,10)/10,
    time: new Date() -(random(0,10000)),
    path: [],
    tile: {},
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
  this.setAngle = function(degree, l){
    var l = l || 5
    degree-=90
    var angle = degree*Math.PI/180;
    this.ai.speed.x=Math.cos(angle)*l;
    this.ai.speed.y=Math.sin(angle)*l;
    return;
  }
  this.degToPlayer = function () {
    var x = Math.atan2(((player.rpos.y+can.height/2- player.pos.y)-this.y),
                      ((player.rpos.x+can.width/2 - player.pos.x)-this.x))*180/Math.PI
    x+=90
    return x
  }
  this.distToPlayer = function () {
    return dist(player.absPos.x, player.absPos.y, this.x, this.y)
  }
  this.goToPlayer = function () {
    if (this.follow) {
      return
    }
    if (this.distToPlayer()<ter.block.width) {
      this.ai.speed = {x:0,y:0}
      return
    }
    this.goToTile(player.tile)
  }
  this.lastFed = 0
  this.follow = null
  this.goToTile = function (tile, opt) {
    if (!tile) {
      console.error("Geen tile hierzo")
      return false
    }
    var forceNew = false
    if (opt) {
      if (opt.forceNew) {
        forceNew = true
        console.log("Forcenwe");
      }
    }
    if (this.ai.tile.x!==tile.x||this.ai.tile.y!==tile.y||forceNew) {
      this.ai.time = new Date()
      var diz = this
      return new Promise(function(resolve, reject) {
        Path(diz.tile, tile).then(path => {
          if (!path) {
            resolve({noPath:true})
            diz.ai.speed = {x:0,y:0}
            diz.ai.tile = {}
            diz.ai.path = []
          }
          diz.ai.tile = tile
          diz.ai.path = path
          resolve(path)
        })
      });
    } else {
      return false
    }
  }
  this.randomAi = function () {
    var ob = {
      x: random(1,ter.width-2),
      y: random(1,ter.height-2)
    }
    this.goToTile(ob)
    this.ai.time = new Date()
  }
  this.kill = function () {
    animals.splice(animals.indexOf(this), 1)
    this.drops.forEach(drop => {
      addItem(drop.type)
    })
  }
  this.updateTile = function () {
    this.tile = {
      x: Math.floor((this.x/ter.block.width)),
      y: Math.floor((this.y/ter.block.width))
    }
  }
  this.damage = function () {
    this.ai.runFromPlayer = true
    this.hp--
    if (this.hp<=0) {
      this.kill()
    }
    this.ai.time = new Date()
  }
  this.feed = function () {
    if (this.hp<4) {
      this.hp++
    }
    this.ai.runFromPlayer = false
    this.ai.time = new Date() *2
    this.ai.path = []
    this.ai.tile = []
    this.fed = true

    var othAn = animals.filter(an=>an.type==this.type&&an.fed&&an!==this)
    if (othAn[0]) {
      othAn[0].follow = this
      this.follow = othAn[0]
    }
  }
  this.fed = false
  this.screenRotation = 0

  this.lastDont = 0
  this.timesDont = 0
  this.dont = function () {
    if (new Date()-this.lastDont<400) {
      this.timesDont++
      if (this.timesDont>50) {
        var helpNeeded = true
        this.timesDont = 0
      }
    } else {
      this.timesDont = 0
    }
    // this.ai.speed.x = M.sign(this.ai.speed.x) * -1
    // this.ai.speed.y = M.sign(this.ai.speed.y) * -1
    var tileCenter = toCoords(this.tile)
    var angle = Math.atan2((tileCenter.y-this.y),
                      (tileCenter.x-this.x))*180/Math.PI
    var degrees = angle + 180 + 90
    var speed = 2
    if (helpNeeded) {
      degrees += 90
      speed = 100
    }
    this.setAngle(degrees, speed)
    this.rotation = degrees
    this.ai.runFromPlayer = false
    this.lastDont = new Date()
    this.ai.time = new Date()
  }
}
function Bubble(pos, opt) {
  this.x = pos.x + random(-ter.block.width/10,+ter.block.width/10)|| 0
  this.y = pos.y + random(-ter.block.width/10,+ter.block.width/10)|| 0
  this.rotation = 0
  this.born = new Date()
  this.speed = random(50,150)/100
  this.size = random(10, 50) * ter.block.width/100
  this.img = img.bubble
  if (opt) {
    if (opt.heart) {
      this.img = img.heart
    }
  }
  this.draw = function () {
    if (new Date()- this.born>1000) {
      bubbles.splice(bubbles.indexOf(this),1)
    }
    this.rotation+=this.speed
    this.size+=this.speed*.1
    c.save()
    c.translate(
      this.x + player.pos.x,
      this.y + player.pos.y - this.rotation
    )
    rotate(this.rotation)
    image(this.img,-this.size/2,-this.size/2 , this.size, this.size)
    c.restore()
  }
}
var grid
function Path(startTile, endTile) {
  if (!startTile||!endTile) {
    console.error(`Geen startTile ${arguments}`)
    return new Promise(function(resolve, reject) {
      reject("Geen tiles")
    });
  }
  if (startTile.x||endTile.x) {
    if (startTile.x<=0||endTile.x<=0||startTile.y<=0||endTile.y<=0||startTile.x>ter.width||endTile.x>ter.width||startTile.y>ter.height||endTile.y>ter.height) {
      console.error("Geen goede starttile")
      return new Promise(function(resolve, reject) {
        reject("Geen goede starttile")
      });
    }
  } else {
    console.error("Geen goede starttile")
    return new Promise(function(resolve, reject) {
      reject("Geen goede starttile")
    });
  }
  var easystar = new EasyStar.js();
  grid = terrain.map(b=>b.map(a=>!a.unwalkable||false))
  grid = grid[0].map((col, i) => grid.map(row => row[i]));
  easystar.setGrid(grid);
  easystar.setAcceptableTiles([true])
  easystar.enableDiagonals()
  easystar.disableCornerCutting()
  return new Promise(function(resolve, reject) {
    easystar.findPath(startTile.x, startTile.y, endTile.x, endTile.y, function( path ) { // X en Y is omgewisseld omdat ik dat eigenlijk verkeerd heb gedaan bij terrain maar boeie
      resolve(path)
    });
    easystar.calculate()
  });
}
