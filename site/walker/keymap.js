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
aEL("contextmenu", terrainClick)
aEL("mouseup", animalsClick)
function keydown(e) {
  keymap[e.key] = e.key
}
function keyup(e) {
  delete keymap[e.key]
}
function mouseClick(e) {
  if (typeof player == "undefined") {
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
function terrainClick(e) {
  if (e) {
    e.preventDefault()
  }
  if (mouse.select) {
    var ter = terrain[mouse.select.x][mouse.select.y]

    if (typeof ter == "string") { // Als het gewoon grond is
      if (mouse.which !== 3) {
        return
      }
      var ps = player.selected
      if (ps) {

        if (game[ps]) {
          if (game[ps]>0) {
            game[ps]--
            terrain[mouse.select.x][mouse.select.y] = new Tile(ps)
          }
        }
      }
    }


    if (typeof ter =="object") { // Hak bomen
      if (mouse.which !== 1) {
        return
      }

      ter.hp-=1
      ter.opacity = ter.hp/10
      if (ter.hp<=0) {
        terrain[mouse.select.x][mouse.select.y] = new Grass()
        if (ter.type !== "tree") {
          addItem(ter.type)
        }
      }
      if (ter.hp>=0&&ter.type=="tree") {
        addItem("wood")
      }
    }

  }
}
var lastHold = new Date()
function mousehold() {
  if (new Date() - lastHold>100) {
    terrainClick()
    lastHold = new Date()
  }
}
function animalsClick(e) {
  animals.forEach((an, i)=>{
    if (dist(mouse.x,mouse.y,an.x,an.y)<100) {
      an.ai.runFromPlayer = true
      an.ai.speed = {
        x: 5,
        y: 5
      }
      an.ai.time = new Date()
      an.hp--
      if (an.hp<=0) {
        animals.splice(i, 1)
        addItem("cow")
      }
    }
  })
}
