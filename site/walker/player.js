Create.player = function () {
  Object.keys(keymap).forEach(key=>{
    var dir = keyCodes[key]
    if (!dir) {
      return
    }
    switch (dir) {
      case `up`:
        player.applySpeed({y:player.speed})
        break;
      case `left`:
        player.applySpeed({x:player.speed})
        break;
      case `down`:
        player.applySpeed({y:-player.speed})
        break;
      case `right`:
        player.applySpeed({x:-player.speed})
        break;
      default:

    }
  })
  if (player.absPos) {
    var px = -player.pos.x + player.rpos.x + (can.width/2)
    var py = -player.pos.y + player.rpos.y + (can.height/2)

    player.tile = {
      x: Math.round(px/ter.width),
      y: Math.round(py/ter.height)
    }
    var x = Math.floor((px/100))
    var y = Math.floor((py/100))
    if (terrain[x]) {
      if (terrain[x][y]) {
        if (terrain[x][y].type=="water") {
          if (bubbles.length<20) {
            bubbles.push(new Bubble)
          }
          player.speed *= .96
          if (player.speed<.5) {
            player.speed=.5
          }
        } else {
          bubbles = []
          player.speed = player.normalSpeed
        }

      }
    }
  }
  player.applyMotion()
  if (player.pos.x>-ter.x) {
    player.rpos.x-=player.pos.x-ter.x
    player.pos.x=-ter.x
  }
  if (player.pos.y>-ter.y) {
    player.rpos.y-=player.pos.y-ter.y
    player.pos.y=-ter.y
  }
  if (player.pos.x<-(ww-can.width)) {
    player.rpos.x-=player.pos.x+(ww-can.width)
    player.pos.x=-(ww-can.width)
  }
  if (player.pos.y<-(ww-can.height)) {
    player.rpos.y-=player.pos.y+(ww-can.height)
    player.pos.y=-(ww-can.height)
  }
  if (player.rpos.x<-can.width/2) {
    player.rpos.x = -can.width/2
  }
  if (player.rpos.y<-can.height/2) {
    player.rpos.y = -can.height/2
  }
  if (player.rpos.x>can.width/2) {
    player.rpos.x = can.width/2
  }
  if (player.rpos.y>can.height/2) {
    player.rpos.y = can.height/2
  }
  c.save()
  c.translate(
    player.rpos.x+can.width/2,
    player.rpos.y+can.height/2
  )
  rotate(player.rotation)
  image(img.player,
    -100/2, // X
    -100/2, // Y
    100,
    100
  )
  c.restore()
  player.absPos = {
    x: player.pos.x + (can.width/2)+player.rpos.x,
    y: player.pos.y + (can.height/2)+player.rpos.y,
  }
}
