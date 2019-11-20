var keymap = {}
var mouse = {
  ago: function () {
    return
  }
}
var keyCodes = {
  w: `up`,
  a: `left`,
  s: `down`,
  d: `right`,
  ArrowUp: `up`,
  ArrowLeft: `left`,
  ArrowDown: `down`,
  ArrowRight: `right`,
}

aEL("keydown", keydown)
aEL("keyup", keyup)

aEL("mouseup",mouseClick)
aEL("mousedown",mouseClick)
aEL("mousemove", mouseClick)

aEL("mouseup", terrainClick)
aEL("mouseup", animalsClick)
function keydown(e) {
  keymap[e.key] = e.key
}
function keyup(e) {
  delete keymap[e.key]
}
function mouseClick(e) {
  if (!player) {
    return
  }
  var x = Math.atan((e.clientY-(player.rpos.y+can.height/2))/
                    (e.clientX-(player.rpos.x+can.width/2)))*180/Math.PI
  if (e.clientX<(player.rpos.x+can.width/2)) {
    x+=180
  }
  x+=30
  player.rotation = x
  mouse.x = e.clientX  - player.pos.x
  mouse.y = e.clientY  - player.pos.y
  mouse.which = e.which
  if (e.which) {
    mouse.timestamp = new Date()
    mouse.ago = function () {
      return new Date() - mouse.timestamp
    }
  }
}
function terrainClick() {
  if (mouse.select) {
    var ter = terrain[mouse.select.x][mouse.select.y]
    if (typeof ter !=="object") {
      return
    }
    ter.hp-=1
    ter.opacity = ter.hp/10
    ter.color =  `hsl(${ter.hp*10}, 50%, 50%)`
    if (ter.hp>=0) {
      game.wood++
    }
    if (ter.hp<=0) {
      terrain[mouse.select.x][mouse.select.y] = ter.bgColor
    }
  }
}
function animalsClick() {
  animals.forEach((an, i)=>{
    if (dist(mouse.x,mouse.y,an.x,an.y)<100) {
      an.rotation-=10
      an.y-=10
      an.hp--
      if (an.hp<=0) {
        animals.splice(i, 1)
        game.cow++
      }
    }
  })
}
