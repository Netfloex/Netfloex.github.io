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
  Escape: `escape`,

  t: "toggleDim"
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
  if (keyCodes[e.key]=="toggleDim") {
    toggleDim()
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
  mouse.x = e.clientX  - player.pos.x
  mouse.y = e.clientY  - player.pos.y
  mouse.screenX = e.clientX
  mouse.screenY = e.clientY
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
      var ps = hotbarKeys[player.selected]
      if (ps) {
        if (ter.unplacable) { // Op cobble mag je niet plaatsen
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
            give(ps, -1)
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
        terrain[mouse.select.x][mouse.select.y] = new Tile(terrain.bgname, {noHp:true})
        if (ter.spawnOres) {
          var r = random(0, 100)
          if (r>50) {
            terrain[mouse.select.x][mouse.select.y] = new Tile("diaOre")
            return
          }
        }
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
  if (hotbarKeys[player.selected]=="axe") {
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
      an.damage("player")
    }
  })
}
function scroll(e) {
  if (!player) {
    return
  }
  var s = player.selected
  var i = hotbarKeys
  var scr = Math.sign(e.deltaY)
  if (!s||typeof s !== "number") {
    player.selected = 0
    s = 0
  }
  if (i[scr+s]) {
    player.selected = scr+s
    // hotbarItems.forEach((hi, i) => {
    //   hi.classList.remove("selected")
    //   if (s+scr==i) {
    //     hi.classList.add("selected")
    //   }
    // })

  }

}
