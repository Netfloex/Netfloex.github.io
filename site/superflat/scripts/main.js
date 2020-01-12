var ter = {
  width: 50,
  height: 50,
  block: {
    width: 128
  }
}
ter.ww = ter.width * ter.block.width
ter.hw = ter.height * ter.block.width
var config = {
	type: Phaser.AUTO,
	backgroundColor: '#fff',
	scale: {
		// mode: Phaser.Scale.NO_SCALE,
		width: innerWidth,
		height: innerHeight
	},
	physics: {
		default: 'matter',
		matter: {
			debug: true,
      gravity: {
        y:0
      }
		}
	},

	scene: {
		preload: preload,
		create: create,
		update: update
	},
  banner: false
};
var M = Math
var floor = M.floor

var P = Phaser
var PM = P.Math
var PMA = PM.Angle
var map,player,cursors,camera,marker,joyStick;

var game = new P.Game(config);
addEventListener('contextmenu', function (e) {
  e.preventDefault()
})
addEventListener('resize', function () {
  game.scale.resize(innerWidth,innerHeight)
  game.canvas.width = innerWidth;
  game.canvas.height = innerHeight;
});
