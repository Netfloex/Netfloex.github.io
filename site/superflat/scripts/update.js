function update () {
  var acc = player.body.velocity
  var speed = 1
  if (cursors.ctrl.isDown||cursors.shift.isDown || joyStick.force>100) {
    speed*=2.5
  }
  var keyPressed = false
  if (cursors.left.isDown||cursors.a.isDown || joyStick.left) {
      acc.x += -speed
      keyPressed = true
  }
  if (cursors.right.isDown||cursors.d.isDown || joyStick.right) {
      acc.x += +speed
      keyPressed = true
  }
  if (cursors.up.isDown||cursors.w.isDown || joyStick.up) {
      acc.y += -speed
      keyPressed = true
  }
  if (cursors.down.isDown||cursors.s.isDown || joyStick.down) {
      acc.y += +speed
      keyPressed = true
  }
  player.setVelocity(acc.x, acc.y)

  var m = game.input.activePointer
  if (m.x!==0||m.y!==0) {
    marker.cameraFilter = 0

    m = {
      x: m.x + camera.worldView.x,
      y: m.y + camera.worldView.y
    }
    marker.x = floor(m.x/ter.block.width)*ter.block.width
    marker.y = floor(m.y/ter.block.width)*ter.block.width
    if (!keyPressed) {
      var rad = PMA.Between(player.x, player.y, m.x, m.y)
    } else {
      var rad = new PM.Vector2(acc).angle()
    }
    player.toRotation = rad
    player.screenRotation = PMA.RotateTo(player.screenRotation, player.toRotation, .1)
    player.setAngle(player.screenRotation*180/M.PI)

  }


  animals.forEach(an=> {
    an.thrust(.1)
    an.rotation += .05
  })
}
function joyStickUpdate() {
  player.toRotation = PM.DegToRad(joyStick.angle)
  console.log(joyStick.force);
}
