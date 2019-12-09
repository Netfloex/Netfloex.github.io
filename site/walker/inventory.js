var lastInventory = 0
var inventoryOpen = false

var inventoryItems = Array.from(document.querySelectorAll('.invItem'))

Create.inventory = function () {
  var keys = Object.keys(game.inventory)
  keys.forEach((key, i) => {
    var imgKey = key
    if (key=="wood") {
      imgKey = "log"
    }
    var imag = inventoryItems[i].querySelector("img")
    var count = inventoryItems[i].querySelector("span")

    if (imag == null) {
      imag = document.createElement("img")
      inventoryItems[i].appendChild(imag)
      imag.className = "hotbarImg"
    }
    if (count == null) {
      count = document.createElement("span")
      inventoryItems[i].appendChild(count)
    }
    imag.src = img[imgKey].getAttribute("src")
    imag.alt = key
    inventoryItems[i].title = key
    count.innerHTML = game.inventory[key]
  })
  var div = d("#craftingTable")
  craftables.forEach((craft, i) => {
    var tr = d(`.tr${i}`)
    if (!tr) {
      tr = document.createElement("tr")
      tr.className = `tr${i}`
      div.appendChild(tr)
    }
    craft.in.forEach(crIn => { // Input
      var td = tr.querySelector(".td")
      if (!td) {
        td = document.createElement("td")
        td.className="td invItem"
        tr.appendChild(td)
      }
      if (crIn.count>game.inventory[crIn.type]) {
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
    var td2 = tr.querySelector(".td2") // Output
    if (!td2) {
      td2 = document.createElement("td")
      td2.className = "td2 invItem"
      tr.appendChild(td2)
    }
    td2.onclick = function () {
      var enough = true
      craft.in.forEach(crIn => {
        if (crIn.count>game.inventory[crIn.type]) {
          enough = false
        }
      })
      if (enough) {
        game.inventory[craft.out.type]+=craft.out.count
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
