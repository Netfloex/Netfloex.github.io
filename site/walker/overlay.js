var invKeys = Object.keys(game.inventory)
Create.overlay = function () {
  var hotbar = d("#hotbar")

  invKeys.forEach(key => {
    var td = createEl("td", hotbar, key)
    td.classList.add("hotbarItem")
    if (player.selected !==key) {
      td.classList.remove("selected")
    } else {
      td.classList.add("selected")
    }
    var imag = createEl("img", td)
    imag.src = img[key].getAttribute("src")
    imag.alt = key
    imag.classList.add("hotbarImg")
    var span = createEl("span", td)
    span.id = key
    span.innerHTML = game.inventory[key]
  })
}
