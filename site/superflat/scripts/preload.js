function preload () {

  this.load.path = "img/"
  this.load.spritesheet('dude', 'survivor idle.png', {
    frameWidth: 289,
    frameHeight: 224
  });
  // this.load.multiatlas('textures', 'textures.json', 'img');
  this.load.spritesheet('tiles', 'tiles.png', {
    frameWidth: 128,
    frameHeight: 128
  });
  this.load.path = "scripts/lib/"
  if (game.device.input.touch) {
    this.load.plugin('rexvirtualjoystickplugin', "rexvirtualjoystickplugin.min.js", true);
  }
}
