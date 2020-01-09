var ter = {
  width: 30,
  height: 30,
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
		default: 'arcade',
		// arcade: {
		// 	debug: true
		// }
	},

	scene: {
		preload: preload,
		create: create,
		update: update
	}
};
var M = Math
var floor = M.floor

var P = Phaser
var PM = P.Math
var PMA = PM.Angle
var map,player,cursors,camera,marker;

var game = new P.Game(config);
addEventListener('contextmenu', function (e) {
  e.preventDefault()
})
addEventListener('resize', function () {
  game.scale.resize(innerWidth,innerHeight)
  game.canvas.width = innerWidth;
  game.canvas.height = innerHeight;
});
