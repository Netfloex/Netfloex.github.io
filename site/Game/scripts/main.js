var ter = {
  width: 50,
  height: 50,
  block: {
    width: 32
  }
}

var config = {
    type: Phaser.AUTO,
    // backgroundColor: '#fff',
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: ter.block.width*11,
        height: ter.block.width*11
    },
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var map, player, cursors;

var game = new Phaser.Game(config);

function preload () {

  this.load.image('bomb', 'img/bomb.png');

  this.load.image('grass', 'img/grass.png');
  this.load.spritesheet('dude', 'img/survivor idle.png', { frameWidth: 289, frameHeight: 224 });

  // this.load.path = "https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/"

}

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


  map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });

  layer = map.createDynamicLayer(0, map.addTilesetImage('grass'), 0, 0)

  player = this.physics.add.sprite(10,10,"dude")
  this.add.image(100, 100, 'bomb');
  cursors = this.input.keyboard.createCursorKeys();
  player.setCollideWorldBounds(true);
  this.cameras.main.startFollow(player, true, 0.5, 0.5);
  this.cameras.main.setBounds(0, 0, ter.width*ter.block.width, ter.height*ter.block.width);
  this.physics.world.setBounds(0, 0, ter.width*ter.block.width, ter.height*ter.block.width);

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 19
    }),
    frameRate: 30,
    repeat: -1
  });
  player.play("idle")
}

function update () {
  var acc = player.body.velocity
  var speed = 100
  if (cursors.left.isDown) {
      acc.x += -speed
  }
  if (cursors.right.isDown) {
      acc.x += +speed
  }
  if (cursors.up.isDown) {
      acc.y += -speed
  }
  if (cursors.down.isDown) {
      acc.y += +speed
  }
  acc.x *=.91
  acc.y *=.91

}
