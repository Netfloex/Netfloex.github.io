function create () {


  var level = []; // 2 dimensionale array die met gras
  for (var x = 0; x <= ter.height; x++) {
    level[x] = []
    for (var y = 0; y <= ter.width; y++) {
      level[x][y] = tileList.grass
      if (x==0||y==0||x==ter.height||y==ter.width) {
        level[x][y] = tileList.sides
      }
    }
  }


  map = this.make.tilemap({ data: level, tileWidth: ter.block.width, tileHeight: ter.block.width });
  layer = map.createDynamicLayer(0, map.addTilesetImage('tiles'), 0, 0)
  camera = this.cameras.main
  cursors = this.input.keyboard.addKeys("w,a,s,d,left,right,up,down,ctrl,shift");

  marker = this.add.graphics().lineStyle(4).strokeRect(0,0, ter.block.width, ter.block.width)
  marker.cameraFilter = 1

  player = this.physics.add.sprite(10,10,"dude")
        .setCollideWorldBounds(true)
        .setScale(.6)
        .setSize(130,130).setOffset(80,50)
  player.screenRotation = 0

  this.cameras.main.startFollow(player, true, 0.1, 0.1)
                   .setBounds(0, 0, ter.ww+ ter.block.width, ter.hw+ ter.block.width);
  this.physics.world.setBounds(ter.block.width, ter.block.width, ter.ww - ter.block.width, ter.hw - ter.block.width);

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
