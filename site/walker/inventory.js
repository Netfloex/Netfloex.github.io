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
    count.innerHTML = game.inventory[key]
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
function toggleDark() {
  d("#darkOverlay").classList.toggle("hidden")
}
function openDark() {
  d("#darkOverlay").classList.remove("hidden")
}
function closeDark() {
  d("#darkOverlay").classList.add("hidden")
}
