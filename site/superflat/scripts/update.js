function update () {
  var acc = player.body.velocity
  var speed = 50
  if (cursors.ctrl.isDown||cursors.shift.isDown) {
    speed*=2.5
  }
  if (cursors.left.isDown||cursors.a.isDown) {
      acc.x += -speed
  }
  if (cursors.right.isDown||cursors.d.isDown) {
      acc.x += +speed
  }
  if (cursors.up.isDown||cursors.w.isDown) {
      acc.y += -speed
  }
  if (cursors.down.isDown||cursors.s.isDown) {
      acc.y += +speed
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

  var rad = Phaser.Math.Angle.Between(player.x, player.y, m.x, m.y)
  player.body.rotation = rad * 180/ Math.PI
}
