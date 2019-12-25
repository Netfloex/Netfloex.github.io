var marketOpen = false
d(".markt .left").addEventListener("click", wip)
d(".markt .right").addEventListener("click", wip)
function wip(e) {
  this.innerHTML = `Sorry this is not yet available`
}
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
}
