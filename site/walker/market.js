var marketOpen = false
Create.market = function () {
  if (terrain.type!=="overworld") {
    return
  }
  var i = img.market
  var x = ter.block.width + ter.block.width/10
  var scale = ter.block.width/100
  image(i, x + player.pos.x, x + player.pos.y, i.width * scale, i.height * scale)

  var i = img.sign
  var x = ter.block.width + ter.block.width/10
  var xx = ter.block.width * 2
  var scale = ter.block.width/100 *.15
  image(i, x + player.pos.x + xx, x + player.pos.y, i.width * scale, i.height * scale)


}
function openMarket() {
  d("#market").classList.remove("invHidden")
  marketOpen = true
  openDark()

  d(`.markt[type="sells"]`).classList.add("hidden")
  d(`.markt[type="select"]`).classList.remove("hidden")
}
function marketClick() {
  var type = this.getAttribute("type")
  if (type!=="sell") {
    this.innerHTML = `Sorry this is not yet available`
    return
  }
  var sells = d(`.markt[type="sells"]`)
  sells.classList.remove("hidden")
  d(`.markt[type="select"]`).classList.add("hidden")

  market.sells.forEach(s=> {
    var div = createEl("div", sells, s.item)
    div.classList.add("invItem")
    div.classList.add("marketItem")
    if (!game.inventory[s.item]||game.inventory[s.item]<0) {
      div.classList.add("disabled")
    }
      var im = createEl("img", div)
      im.src = img[s.item].getAttribute("src")
      im.classList.add("hotbarImg")

      var span = createEl("span", div)
      span.innerHTML = `<i class="fas fa-dollar-sign"></i>${s.price}`
      div.onclick = function () {
      if (game.inventory[s.item]) {
        if (game.inventory[s.item]>0) {
          give(s.item, -1)
          game.money+=s.price
        }
      }
    }
  })
}
d(".markt .left").addEventListener("click", marketClick)
d(".markt .right").addEventListener("click", marketClick)
