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


  e: `inventory`,
  Escape: `escape`
}
aEL("keydown", keydown)
aEL("keyup", keyup)
aEL("blur", offScreen)
aEL("click", function () {
  mouse.which = 0
})

aEL("mouseup",mouseClick)
aEL("mousedown",mouseClick)
aEL("mousemove", mouseClick)

aEL("mouseup", terrainClick)
aEL("contextmenu", terrainClick)
aEL("mouseup", animalsClick)

aEL("wheel", scroll)

function keydown(e) {
  if (inventoryOpen) {
    return
  }
  keymap[e.key] = e.key
}
function keyup(e) {
  if (keyCodes[e.key]=="inventory") {
    toggleInventory()
  }
  if (keyCodes[e.key]=="escape") {
    if (inventoryOpen) {
      toggleInventory()
    }
  }
  delete keymap[e.key]
}
function offScreen() {
  keymap = []
  mouse = {}
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

    if (!ter.hp) { // Bouwen
      if (mouse.which !== 3) {
        return
      }
      var ps = player.selected
      if (ps) {
        if (ter.type=="cobble") { // Op cobble mag je niet plaatsen
          return
        }
        if (itemsList[ps]) {
          if (!itemsList[ps].placable) {
            return
          }
        } else if (ps!=="empty") {
          console.warn(`Let op: ${ps} zit niet in itemsList (variables.js)`)
        }
        if (game.inventory[ps]) {
          if (game.inventory[ps]>0) {
            game.inventory[ps]--
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
        terrain[mouse.select.x][mouse.select.y] = new Tile("grass", true)
        if (ter.type !== "tree") {
          addItem(ter.type)
        } else {
          var oter = window["ter"]
          var boom = new Tree()
          objects.push(boom)
          terrain[boom.x][boom.y] = boom
        }

      }
      if (ter.hp>=0&&ter.type=="tree") {
        addItem("log")
      }
    }

  }
}
var lastHold = new Date()
function mousehold() {
  var delay = 100
  if (player.selected=="axe") {
    delay = -100
  }
  if (new Date() - lastHold>delay) {
    terrainClick()
    lastHold = new Date()
  }
}
function animalsClick(e) {
  if (mouse.which !== 1) {
    return
  }
  animals.forEach((an, i)=>{
    if (dist(mouse.x,mouse.y,an.x,an.y)<ter.block.width) {
      an.ai.runFromPlayer = true
      an.ai.speed = {
        x: 5,
        y: 5
      }
      an.ai.time = new Date()
      an.hp--
      if (an.hp<=0) {
        an.kill()
      }
    }
  })
}
function scroll(e) {
  if (!player) {
    return
  }
  var s = player.selected
  var i = hotbarItems
  if (!s) {
    player.selected = i[0]
    s = i[0]
  }
  var span = d(`#${s}`)
  if (!span) {
    return
  }
  var index = i.indexOf(span.parentElement)
  console.log(index);
  var scr = Math.sign(e.deltaY)
  var ss = index + scr
  if (i[ss]) {
    hotbarItems.forEach(y=> {
      y.classList.remove("selected")
    })
    i[ss].classList.add("selected")
    player.selected = i[ss].querySelector("span").id
  }

}
