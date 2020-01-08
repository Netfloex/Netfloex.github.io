function preload () {

  this.load.image('bomb', 'img/bomb.png');

  this.load.image('grass', 'img/grass.png');
  this.load.spritesheet('dude', 'img/survivor idle.png', { frameWidth: 289, frameHeight: 224 });
  this.load.multiatlas('textures', 'img/textures.json', 'img');
}
