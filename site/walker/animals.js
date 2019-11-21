Create.animals = function () {
  var w = 150
  animals.forEach(an=>{
    c.save()
    c.globalAlpha= an.hp/10 + .5
    c.translate(an.x + player.pos.x, an.y + player.pos.y)
    rotate(an.rotation)
    image(an.img, -w/2, -w/2, w, w)
    c.restore()
    an.x+=an.ai.speed.x
    an.y+=an.ai.speed.y
    var obj = {
      x: 0,
      y: 0,
      width: ww,
      height: ww
    }
    if (!isHitbox(an, obj)) {
      an.x = can.width/2
      an.y = can.height/2
    }
    if (an.ai.runFromPlayer) {
      var x = Math.atan2(((player.rpos.y+can.height/2- player.pos.y)-an.y),
                        ((player.rpos.x+can.width/2 - player.pos.x)-an.x))*180/Math.PI
      x+=90
      x+=180
      an.rotation = x
      an.setAngle(x)
    }
    if (!an.ai.speed.x&&!an.ai.speed.y&&!x) {

      an.rotation+=an.ai.rotateSpeed
    }
    if (new Date() - an.ai.time>5000) {
      an.randomAi()
    }
  })
}
