var lastInventory = 0
var inventoryOpen = false

var inventoryItems = Array.from(document.querySelectorAll('.invItem'))

function give(item, count) {
  var c = count || 1
  if (game.inventory[item]) {
    game.inventory[item]+= c
  } else {
    game.inventory[item] = c
  }
}
Create.inventory = function () {
  var keys = Object.keys(game.inventory)
  keys.forEach((key, i) => {
    if (game.inventory[key]==0) {
      inventoryItems[i].innerHTML= ""
      return
    }
    var imag = createEl("img", inventoryItems[i], "hotbarImg")
    var count = createEl("span", inventoryItems[i])
    imag.src = img[key].getAttribute("src")
    imag.alt = key
    inventoryItems[i].title = key
    count.innerHTML = game.inventory[key]
  })
  var div = d("#craftingTable")
  craftables.forEach((craft, i) => {
    var enoughItems = true
    var tr = d(`.tr${i}`)
    if (!tr) {
      tr = document.createElement("tr")
      tr.className = `tr${i}`
      div.appendChild(tr)
    }

    craft.in.forEach((crIn, i) => { // Input
      var td = createEl("td", tr, `td${i}`)
      td.classList.add(`invItem`)
      if (crIn.count>game.inventory[crIn.type]||!game.inventory[crIn.type]) {
        enoughItems = false
        td.classList.add("disabled")
      } else {
        td.classList.remove("disabled")
      }
      var inImg = td.querySelector("img")
      if (!inImg) {
        inImg = document.createElement("img")
        td.appendChild(inImg)
      }
      inImg.src = img[crIn.type].getAttribute("src")
      inImg.alt = crIn.type
      inImg.className = "hotbarImg"

      var span = td.querySelector("span")
      if (!span) {
        span = document.createElement("span")
        td.appendChild(span)
      }
      span.innerHTML = crIn.count
    })

    var arrow = tr.querySelector(".arrow")
    if (!arrow) {
      arrow = document.createElement("td")
      arrow.className="arrow"
      tr.appendChild(arrow)
    }
    var arrowImg = arrow.querySelector("img")
    if (!arrowImg) {
      arrowImg = document.createElement("img")
      arrowImg.src = img.arrow.getAttribute("src")
      arrowImg.alt = ">"
      arrowImg.className = "hotbarImg"
      arrow.appendChild(arrowImg)
    }
    var td2 = createEl("td", tr, "td2") // Output
    td2.classList.add("invItem")
    if (!enoughItems) {
      td2.classList.add("disabledOut")
    } else {
      td2.classList.remove("disabledOut")
    }
    td2.onclick = function () {
      var enough = true
      craft.in.forEach(crIn => {
        if (crIn.count>game.inventory[crIn.type]) {
          enough = false
        }
      })
      if (enough) {
        give(craft.out.type, craft.out.count)
        craft.in.forEach(crIn => {
          game.inventory[crIn.type]-= crIn.count
        })
      }
    }
    var outImg = td2.querySelector("img")
    if (!outImg) {
      outImg = document.createElement("img")
      td2.appendChild(outImg)
    }
    outImg.src = img[craft.out.type].getAttribute("src")
    outImg.alt = craft.out.type
    outImg.className = "hotbarImg"
    var span = td2.querySelector("span")
    if (!span) {
      span = document.createElement("span")
      td2.appendChild(span)
    }
    span.innerHTML = craft.out.count
  })
}
function toggleInventory() {
  if (new Date() - lastInventory<200) {
    return
  }
  lastInventory = new Date()
  d("#inventory").classList.toggle("invHidden")
  inventoryOpen = "true"

  if (d("#inventory").classList.contains("invHidden")) {
    inventoryOpen = false
    closeDark()
  } else {
    openDark()
  }
}
function openDark() {
  d("#darkOverlay").classList.remove("darkHidden")
}
function closeDark() {
  d("#darkOverlay").classList.add("darkHidden")
}
