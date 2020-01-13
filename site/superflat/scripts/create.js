function create () {

  create = this

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


  map = this.make.tilemap({ data: level, tileWidth: ter.block.width, tileHeight: ter.block.width })
  layer = map.createDynamicLayer(0, map.addTilesetImage('tiles'), 0, 0)
  gameRect = new Phaser.Geom.Rectangle(ter.block.width, ter.block.width, ter.ww-ter.block.width, ter.hw-ter.block.width);

  camera = this.cameras.main
  cursors = this.input.keyboard.addKeys("w,a,s,d,left,right,up,down,ctrl,shift");

  marker = this.add.graphics().lineStyle(4).strokeRect(0,0, ter.block.width, ter.block.width)
  marker.cameraFilter = 1

  player = this.matter.add.sprite(1000,1000,"dude")
        .setRectangle(130,130)
        .setScale(.6)
        .setFriction(.4, .07)
        // .setSize(130,130)
        // .setOffset(80,50)
  player.screenRotation = 0
  player.toRotation = 0
  this.cameras.main.startFollow(player, true, 0.1, 0.1)
                   .setBounds(0, 0, ter.ww+ ter.block.width, ter.hw+ ter.block.width);
  this.matter.world.setBounds(ter.block.width, ter.block.width, ter.ww - ter.block.width, ter.hw - ter.block.width);
  for (var i = 0; i < 8; i++) {
    var an = this.matter.add.sprite(1000,1000, "animals")
    .setScale(.5)
    .setFriction(.4, .07)
    .setFrame(PM.RND.between(0,1))
    .setAngle(PM.RND.angle())
    animals.push(an)
  }
  P.Actions.RandomRectangle(animals, gameRect)
  // animals = this.matter.world.nextGroup({
  //   key: 'animals',
  //   repeat: 11,
  //   randomKey:true,
  //   setScale: {
  //     x: .5,
  //     y: .5
  //   },
  // })
  // animals.children.entries.forEach(an=>an.setCollideWorldBounds(true))
  // this.matter.add.collider(animals, animals)
  // this.matter.add.collider(player, animals)
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

  if (game.device.input.touch) {
    var r = innerWidth / 8
    joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
  		x: 1.5*r,
  		y: innerHeight - 1.5*r,
  		radius: r,
  		base: this.add.circle(0, 0, r, 0x888888),
  		thumb: this.add.circle(0, 0, r/2, 0xcccccc),
  		// dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
  		// forceMin: 16,
  		// enable: true
  	})
    .on('update', joyStickUpdate, this);
  } else {
    joyStick = {
      false:true
    }
  }

}
