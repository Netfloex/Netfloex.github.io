Create.items = function () {
  var w = ter.block.width *.8
  items.forEach((i, index) => {
    if (i.world!==terrain.type) {
      return
    }
    c.save()
      c.translate(i.x + player.pos.x, i.y + player.pos.y + Math.sin(i.rotation/10)*ter.block.width*.3)
      rotate(i.rotation)
        image(i.img,-w/2,-w/2 , w, w)
    c.restore()
    i.rotation++
    if (!player.absPos) {
      return
    }
    var dista = dist(player.absPos.x, player.absPos.y, i.x, i.y)
    if (dista<ter.block.width) {
      items.splice(index, 1)
      i.collect()
    }
  })
}
function addItem(type) {
  var c = toCoords(mouse.select)
  items.push(
    new Item(c.x, c.y, type)
  )
}
