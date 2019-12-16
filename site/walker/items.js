Create.items = function () {
  var w = 70
  items.forEach((i, index) => {
    c.save()
      c.translate(i.x + player.pos.x, i.y + player.pos.y + Math.sin(i.rotation/10)*30)
      rotate(i.rotation)
        image(i.img,-w/2,-w/2 , w, w)
    c.restore()
    i.rotation++
    var dista = dist(player.absPos.x, player.absPos.y, i.x, i.y)
    if (dista<ter.block.width) {
      items.splice(index, 1)
      i.collect()
    }
  })
  arc(player.absPos.x, player.absPos.y)
}
function addItem(type) {
  var c = toCoords(mouse.select)
  items.push(
    new Item(c.x, c.y, type)
  )
}
