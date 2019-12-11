var invKeys = Object.keys(game.inventory)
// invKeys.push("empty")
var hotbarItems = []
Create.overlay = function () {
  var hotbar = d("#hotbar")
  hotbarItems = []
  invKeys.forEach((key) => {
    if (itemsList[key]) {
      if (!itemsList[key].hotbar) {
        return
      }
    }
    if (game.inventory[key]==0) {
      if (hotbar.querySelector(`.${key}`)) {

        hotbar.querySelector(`.${key}`).remove()
      }
      return
    }
    var td = createEl("td", hotbar, key)
    hotbarItems.push(td)
    td.classList.add("hotbarItem")
    if (player.selected !==key) {
      td.classList.remove("selected")
    } else {
      td.classList.add("selected")
    }
    var span = createEl("span", td)
    span.id = key
    span.innerHTML = game.inventory[key]
    if (key=="empty") {
      span.innerHTML = ""
      return
    }
    var imag = createEl("img", td)
    imag.src = img[key].getAttribute("src")
    imag.alt = key
    imag.classList.add("hotbarImg")
  })
}
