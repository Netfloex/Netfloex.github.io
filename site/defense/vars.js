// Setup
var can = document.getElementById('canvas')
var c   = can.getContext('2d')

var width = 1100
var height= 660
addEventListener('load', function () {
	addEventListener('resize', onresize)
	function onresize() {
		can.width = innerWidth
		can.height= innerHeight
		draw()
	}
	onresize()
})

var $$;

// Images
var cannon = []
for (var i = 1; i <= 4; i++) {
	cannon.push({'img':new Image()})
	cannon[i-1].img.src = 'cannon' + i +'.png'
}

var koopa = []
for (var i = 1; i <= 4; i++) {
	koopa.push(new Image())
	koopa[i-1].src = 'koopa' + i +'.png'
}
koopa[1000]=newImage(koopa[1000], 'shears-koopa')
var thorns = []
for (var i = 1; i <= 3; i++) {
	thorns.push(new Image())
	thorns[i-1].src = 'thorns' + i +'.png'
}
var pause = []
for (var i = 1; i <= 2; i++) {
	pause.push(new Image())
	pause[i-1].src = 'pause' + i +'.png'
}
var pausing = false;

var hackIcons = []
for (var i = 1; i <= 3; i++) {
	hackIcons.push(new Image())
	hackIcons[i-1].src = 'hackIcons' + i +'.png'
}

var koopas;

// Vars
var Grid;
var buying;
var cannonballs;
var golds;
var r;
var disX = 180;
var disY = 95;
var offX = 78
var offY = 95
var started
var hor = 9
var ver = 6
var x = -1000;
var y= -1000;
var hammerX = 270;
var hammerY = 10;
var hammerX2 = 338;
var hammerY2 = 38;
var winning;

function resetVars() {
	buying = false
	cannonballs = []
	golds       = []
	$$  = 25
	koopas= []
	r=0
	started = false;
	winning = false

	Grid = new Array(hor);
	for (var i =0; i < hor; i++) {
	Grid[i] = new Array(ver)

		for (var j = 0; j < ver; j++) {
			Grid[i][j] = {
				'defense':'',
				'x':i*offX+disX,
				'y':j*offY+disY
			}
		}
	}
	for (var i = 0; i < defenses.length; i++) {
		defenses[i].waitTime=0
	}
}


var cannonball = newImage(cannonball, 'cannonball')
var cannonbuy = newImage(cannonbuy, 'cannonbuy')
var frame = newImage(frame, 'frame')
var moneyimage = newImage(moneyimage, 'moneyimage')
var goldmine = newImage(goldmine, 'goldmine')
var hammer = newImage(hammer, 'hammer')
hammer.img = hammer
var goldbuy = newImage(goldbuy, 'goldminebuy')
var gold = newImage(gold, 'gold')
var background = newImage(background, 'background')
var thornsbuy = newImage(thornsbuy, 'thornsbuy')
var wallbuy = newImage(wallbuy, 'wallbuy')
var wall = newImage(wall, 'wall')
var useHacks = newImage(useHacks, 'useHacks')

var Cannon = {
	'price':50,
	'hp':1500,
	'speed':500,
	'damage':20,
	'ca':0,
	'name':'cannon',
	'time':2000,
	'waitTime':0,
	'buy':cannonbuy,
	'unlock':0
}
Cannon.img= newImage(Cannon.img, 'cannon1')
var Gold = {
	'price':25,
	'hp':1000,
	'speed':2500,
	'money':20,
	'name':'gold',
	'time':1000,
	'waitTime':0,
	'buy':goldbuy,
	'unlock':0
}
Gold.img = goldmine
var Thorns = {
	'price':100,
	'hp':1000,
	'name':'thorns',
	'speed':0,
	'unlock':1,
	'ca':0,
	'time':5000,
	'waitTime':0,
	'buy':thornsbuy
}
Thorns.img = newImage(Thorns.img, 'thorns1')

var Wall = {
	'price':70,
	'hp':5000,
	'name':'wall',
	'speed':0,
	'unlock':2,
	'ca':0,
	'time':7000,
	'waitTime':0,
	'buy':wallbuy
}
Wall.img = newImage(Wall.img, 'wall')

var defenses = [
		Cannon,
		Gold,
		Thorns,
		Wall,
		hammer
]

var currentLevel = 0;
var level = []
level[0] = 
[
	{
		'after':1000,
		'k':0,
		'amount':1
	},
	{
		'after':5500,
		'k':0,
		'amount':5
	},
	{
		'after':12500,
		'k':0,
		'amount':7
	},
	{
		'after':30500,
		'k':1,
		'amount':4
	},
	{
		'after':40000,
		'k':2,
		'amount':7
	},
	{
		'after':51000,
		'k':3,
		'amount':3
	}
]
level[1] = 
[
	{
		'after':2000,
		'k':1,
		'amount':1
	},
	{
		'after':10000,
		'k':2,
		'amount':4
	},
	{
		'after':20000,
		'k':1000,
		'amount':2
	},
	{
		'after':35000,
		'k':0,
		'amount':50
	}
]
level[2] = 
[
	{
		'after':2000,
		'k':1000,
		'amount':2
	},
	{
		'after':5000,
		'k':2,
		'amount':2
	},
	{
		'after':15000,
		'k':1000,
		'amount':5
	},
	{
		'after':35000,
		'k':1000,
		'amount':10
	}
]
resetVars()