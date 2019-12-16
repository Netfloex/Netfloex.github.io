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
      // case `inventory`:
      //   toggleInventory()
      //   break;
      default:

    }
  })
  player.absPos = {
    x: -player.pos.x + player.rpos.x + (can.width/2),
    y: -player.pos.y + player.rpos.y + (can.height/2)
  }
  if (player.absPos) {
    var px = -player.pos.x + player.rpos.x + (can.width/2)
    var py = -player.pos.y + player.rpos.y + (can.height/2)

    player.tile = {
      x: Math.floor((px/ter.block.width)),
      y: Math.floor((py/ter.block.width))
    }
    var x = player.tile.x
    var y = player.tile.y
    if (terrain[x]) {
      if (terrain[x][y]) {
        if (terrain[x][y].type=="water") {
          if (bubbles.length<20) {
            bubbles.push(new Bubble)
          }
          player.speed *= .96
          if (player.speed<ter.block.width/200) {
            player.speed=ter.block.width/200
          }
        } else {
          bubbles = []
          player.speed = ter.block.width/100
        }

        if (terrain[x][y].type=="portal") {
          toggleDim()
        }
        var wble = terrain[x][y].unwalkable
        if (wble) {
          player.motion = {x:0,y:0}
        }
        if (!wble) {
          player.oldPos = Object.assign({}, player.pos)
          player.oldRPos = Object.assign({}, player.rpos)
        }
        player.applyMotion()
        if (wble&&typeof player.oldPos.x !== "undefined") {
          player.pos = player.oldPos
          player.rpos = player.oldRPos
        }
      }
    }
  }
  if (player.pos.x>-ter.x) {
    player.rpos.x-=player.pos.x-ter.x
    player.pos.x=-ter.x
  }
  if (player.pos.y>-ter.y) {
    player.rpos.y-=player.pos.y-ter.y
    player.pos.y=-ter.y
  }
  if (player.pos.x<-(ww-can.width)||player.rpos.x>10) {
    console.log("ye");
    player.rpos.x-=player.pos.x+(ww-can.width)
    player.pos.x=-(ww-can.width)
  }
  if (player.pos.y<-(ww-can.height)||player.rpos.y>10) {
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
  var w = ter.block.width
  image(img.player,
    -w/2, // X
    -w/2, // Y
    w,
    w
  )
  c.restore()
}
