// invKeys.push("empty")
var hotbarItems = []
var hotbar = d("#hotbar")
Create.overlay = function () {
  hotbarItems = Array.from(hotbar.children)
  var keys = Object.keys(game.inventory).filter(a=>itemsList[a].hotbar)
  keys.forEach((key) => {
    if (game.inventory[key]==0) {
      if (hotbar.querySelector(`.${key}`)) {

        hotbar.querySelector(`.${key}`).remove()
      }
      return
    }
    var td = createEl("td", hotbar, key)
    td.classList.add("hotbarItem")
    if (hotbarKeys[player.selected]==key) {
      td.classList.add("selected")
    } else {
      td.classList.remove("selected")
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

  if (!hotbarKeys[player.selected]) {
    player.selected--
    if (player.selected<0) {
      player.selected =0
    }
  }
}
