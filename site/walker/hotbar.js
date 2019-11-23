var hotbarItems = document.querySelectorAll(".hotbarItem")
hotbarItems = Array.from(hotbarItems)
hotbarItems.forEach(item=> {
  item.addEventListener("click", function (e) {
    var i = item.querySelector("span")
    if (i) {
      i = i.id
      hotbarItems.forEach(y=> {
        y.classList.remove("selected")
      })
      item.classList.add("selected")
      player.selected = i
    }
  })
})
