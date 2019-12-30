
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
    var obj = { // Zonder sides
      x: ter.block.width,
      y: ter.block.width,
      width: ww - ter.block.width*2,
      height: ww - ter.block.width*2
    }
    if (!isHitbox(an, obj)) {an.dont()} // Als hij zijkant raakt, doe het niet
    if (an.ai.runFromPlayer) {
      var x = Math.atan2(((player.rpos.y+can.height/2- player.pos.y)-an.y),
                        ((player.rpos.x+can.width/2 - player.pos.x)-an.x))*180/Math.PI
      x+=90
      if (!an.hostile) { // Als beestje je niet wil aanvallen rent hij weg
        x+=180
      }
      an.rotation = x
      an.setAngle(x)
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
