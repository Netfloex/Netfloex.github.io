var ter = {
  width: 50,
  height: 50,
  block: {
    width: 128
  }
}

var config = {
	type: Phaser.AUTO,
	backgroundColor: '#fff',
	scale: {
		// mode: Phaser.Scale.NO_SCALE,
		width: innerWidth,
		height: innerHeight
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 0
			},
			debug: false
		}
	},

	scene: {
		preload: preload,
		create: create,
		update: update
	}
};
var M = Math
var floor = M.floor
var map,player,cursors,camera,graphics;

var game = new Phaser.Game(config);
addEventListener('contextmenu', function (e) {
  e.preventDefault()
})
addEventListener('resize', function () {
  game.scale.resize(innerWidth,innerHeight)
  game.canvas.width = innerWidth;
  game.canvas.height = innerHeight;
});
