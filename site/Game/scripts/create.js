function create () {
  // if (x==0||y==0||x==ter.width||y==ter.height) {
  //   level[x][y] = tileList.grass()
  // }

  var level = []; // 2 dimensionale array die met gras
  for (var x = 0; x <= ter.height; x++) {
    level[x] = []
    for (var y = 0; y <= ter.width; y++) {
      level[x][y] = tileList.grass()
    }
  }


  map = this.make.tilemap({ data: level, tileWidth: ter.block.width, tileHeight: ter.block.width });
  layer = map.createDynamicLayer(0, map.addTilesetImage('grass'), 0, 0)
  camera = this.cameras.main
  cursors = this.input.keyboard.addKeys("w,a,s,d,left,right,up,down");

  player = this.physics.add.sprite(10,10,"dude")
        .setCollideWorldBounds(true)
        .setScale(.5)
  graphics = this.add.graphics()
  marker = graphics.lineStyle(4).strokeRect(0,0, ter.block.width, ter.block.width)

  this.cameras.main.startFollow(player, true, 0.05, 0.05)
                   .setBounds(0, 0, ter.width*ter.block.width, ter.height*ter.block.width);
  this.physics.world.setBounds(0, 0, ter.width*ter.block.width, ter.height*ter.block.width);

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 19
    }),
    frameRate: 15,
    repeat: -1
  });
  player.play("idle")
}
