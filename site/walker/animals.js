
for (var i = 0; i < 4; i++) {
  animals.push(new Animal("sheep"))
  animals.push(new Animal("cow"))
}

Create.animals = function () {
  var w = ter.block.width * 1.5
  animals.forEach(an=>{
    if (an.world!==terrain.type&&an.world!==false) {
      return
    }
    an.updateTile()
    c.save()
    c.globalAlpha= an.hp/10 + .5
    c.translate(an.x + player.pos.x, an.y + player.pos.y)
    rotate(an.rotation)
    image(an.img, -w/2, -w/2, w, w)
    c.restore()
    an.x+=an.ai.speed.x * ter.block.width/100
    an.y+=an.ai.speed.y * ter.block.width/100
    if (an.ai.path) {
      if (an.ai.path[0]) {
        var x = toCoords(an.ai.path[0])
        var b = toCoords(an.ai.tile)
        var deg = Math.atan2(x.y - an.y,x.x - an.x)*180/Math.PI;
        deg += 90
        arc(x.x + player.pos.x, x.y + player.pos.y, 10, "orange")
        arc(b.x + player.pos.x, b.y + player.pos.y, 10, "green")
        an.setAngle(deg, 3)
        an.rotation = deg
        if (an.tile.x == an.ai.path[0].x&&an.tile.y == an.ai.path[0].y) {
          an.ai.path.shift()
        }
      }
      else {
        an.randomAi()
      }
    }
    var obj = { // Zonder sides
      x: ter.block.width,
      y: ter.block.width,
      width: ww - ter.block.width*2,
      height: ww - ter.block.width*2
    }
    if (!isHitbox(an, obj)) {an.dont()} // Als hij zijkant raakt, doe het niet
    if (an.ai.runFromPlayer) {
      if (!an.hostile) { // Als beestje je niet wil aanvallen rent hij weg
        var x = an.degToPlayer()
        x+=180
        an.rotation = x
        an.setAngle(x)
      } else {
        an.goToPlayer()
      }
    } else {
      if (hotbarKeys[player.selected]==an.bait&&an.distToPlayer()<ter.block.width*5) {
        an.goToPlayer()
      }
    }
    if (!an.ai.speed.x&&!an.ai.speed.y&&!x) {

      an.rotation+=an.ai.rotateSpeed
    }
    if (new Date() - an.ai.time>5000) {
      an.randomAi()
    }
    if (an.tile.x) {
      var x = terrain[an.tile.x]
      if (x) {
        var y = x[an.tile.y]
        if (y) {
          if (y.unwalkable) {
            an.dont()
          }
          if (y.type=="water") {
            if (!random(0,5)) {
              bubbles.push(new Bubble(an))
            }
            if (Math.abs(an.ai.speed.x)>ter.block.width/200) {
              an.ai.speed.x *=.96
              an.ai.speed.y *=.96
              an.rotation = an.getAngle()
            }
          }
        }
      }
    }
  })
}
