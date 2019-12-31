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
  if (typeof inventoryOpen == undefined) {
    return
  }
  if (inventoryOpen||marketOpen) {
    return
  }
  keymap[e.key] = e.key
}
function keyup(e) {
  if (keyCodes[e.key]=="inventory") {
    if (!marketOpen) {
      toggleInventory()
    } else {
      marketOpen = false
      d("#market").classList.add("invHidden")
      closeDark()
    }
  }
  if (keyCodes[e.key]=="escape") {
    d("#inventory").classList.add("invHidden")
    d("#market").classList.add("invHidden")
    inventoryOpen = false
    marketOpen = false
    closeDark()
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
      var opt = {}
      if (ps) {
        if (ter.unplacable) { // Op cobble mag je niet plaatsen
          return
        }
        if (itemsList[ps]) {
          if (itemsList[ps].tills&&ter.type=="grass") {

            terrain[mouse.select.x][mouse.select.y] = new Tile("soil", {noHp:1})
            if (!random(0,2)) {
              addItem("seeds")
            }
            return
          }
          if (!itemsList[ps].placable) {
            return
          }
          if (itemsList[ps].soil) {
            if (ter.type!=="soil") {
              return
            }
            opt.soil = true
            opt.bg = img.soil
          }
        } else if (ps!=="empty") {
          console.warn(`Let op: ${ps} zit niet in itemsList (variables.js)`)
        }
        if (game.inventory[ps]) {
          if (game.inventory[ps]>0) {
            give(ps, -1)
            terrain[mouse.select.x][mouse.select.y] = new Tile(ps, opt)
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
        var bgname = terrain.bgname
        if (ter.soil) {
          bgname = "soil"
          addItem("seeds")
          var r = random(0, 100)
          if (r>50) {
            addItem("seeds")
          }
        }
        terrain[mouse.select.x][mouse.select.y] = new Tile(bgname, {noHp:true})
        if (ter.spawnOres) {
          var r = random(0, 100)
          if (r>70) {
            animals.push(new Animal("zombie", {x:mouse.screenX, y:mouse.screenY}))
          }
          else if (r>80) {
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
  animals.forEach((an, i)=>{
    if (dist(mouse.x,mouse.y,an.x,an.y)<ter.block.width) {
      if (mouse.which == 1) {
        an.damage("player")
      }
      if (mouse.which == 3) {
        if (hotbarKeys[player.selected]==an.bait) {
          if (game.inventory[an.bait]>0) {
            if (!an.fed&&!an.baby&&new Date() - an.lastFed>10000) {
              give(an.bait, -1)
              an.feed()
            }
          }
        }
      }
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
