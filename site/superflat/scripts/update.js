function update () {
  var acc = player.body.velocity
  var speed = 50
  if (cursors.ctrl.isDown||cursors.shift.isDown) {
    speed*=2.5
  }
  var keyPressed = false
  if (cursors.left.isDown||cursors.a.isDown) {
      acc.x += -speed
      keyPressed = true
  }
  if (cursors.right.isDown||cursors.d.isDown) {
      acc.x += +speed
      keyPressed = true
  }
  if (cursors.up.isDown||cursors.w.isDown) {
      acc.y += -speed
      keyPressed = true
  }
  if (cursors.down.isDown||cursors.s.isDown) {
      acc.y += +speed
      keyPressed = true
  }
  acc.x *=.91
  acc.y *=.91


  var m = game.input.activePointer
  m = {
    x: m.x + camera.worldView.x,
    y: m.y + camera.worldView.y
  }
  marker.x = floor(m.x/ter.block.width)*ter.block.width
  marker.y = floor(m.y/ter.block.width)*ter.block.width
  if (marker.x !==0) {
    marker.cameraFilter = 0
  } else {
    return
  }
  if (!keyPressed) {
    var rad = PMA.Between(player.x, player.y, m.x, m.y)
  } else {
    var rad = new PM.Vector2(acc).angle()
  }
  player.screenRotation = PMA.RotateTo(player.screenRotation, rad, .1)
  player.body.rotation = player.screenRotation*180/M.PI
}
