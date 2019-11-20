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
    if (!an.ai.speed.x&&!an.ai.speed.x) {

      an.rotation+=an.ai.rotateSpeed
    }
    if (new Date() - an.ai.time>5000) {
      an.randomAi()
    }
  })
}
