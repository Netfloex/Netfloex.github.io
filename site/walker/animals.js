
for (var i = 0; i < 4; i++) {
  animals.push(new Animal("sheep"))
  animals.push(new Animal("cow"))
}
function fixDeg(deg) {
  deg %= 360
  if (deg<0) {
    deg = 360 - Math.abs(deg)
  }
  return deg
}
Create.animals = function () {
  animals.forEach(an=>{
    var w = ter.block.width * 1.5
    if (an.world!==terrain.type&&an.world!==false) {
      return
    }
    if (an.baby) {
      w /= 2
    }
    an.updateTile()
    c.save()
    c.globalAlpha= an.hp/10 + .5
    c.translate(an.x + player.pos.x, an.y + player.pos.y)
    if (an.screenRotation!==an.rotation) {
      var dif = fixDeg(an.rotation) - fixDeg(an.screenRotation)
      an.screenRotation += dif/10
    }
    rotate(an.screenRotation)
    image(an.img, -w/2, -w/2, w, w)
    c.restore()
    if (new Date() - an.lastFed>5000) { // Eerste seconde na seks zijn de dieren moe
      an.x+=an.ai.speed.x * ter.block.width/100
      an.y+=an.ai.speed.y * ter.block.width/100
    }
    if (an.ai.path) {
      if (an.ai.path[0]) {
        var x = toCoords(an.ai.path[0])
        var b = toCoords(an.ai.tile)
        var deg = Math.atan2(x.y - an.y,x.x - an.x)*180/Math.PI;
        deg += 90
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
    if (an.hostile) {
      if (an.distToPlayer()<ter.block.width*5) {
        an.ai.runFromPlayer = true
      }
    }
    if (an.fed) {

      bubbles.push(new Bubble(an, {heart:true}))
    }
    if (an.follow) {
      an.goToTile(an.follow.tile)
      if (!an.follow.fed) { // Voorkomt een tweeling

        an.follow = false
        an.lastFed = new Date()
        an.fed = false // Voorkomt de tweeling hierboven
        return
      }
      if (dist(an.x, an.y, an.follow.x, an.follow.y)<100) {
        animals.push(new Animal(an.type, {x: an.x, y: an.y}, {baby:true}))
        an.follow = false
        an.lastFed = new Date()
        an.fed = false // Voorkomt de tweeling hierboven
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
