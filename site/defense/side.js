// Side
	var dis = 95
	var wh  = 140
	function side(count) {
		for (var i = 0; i < defenses.length-1; i++) {
			if (defenses[i].unlock<=currentLevel) {
				image(defenses[i].buy,0,i*dis,wh,wh)
			}
		}
	}

	can.addEventListener('mousedown', buy)
	can.addEventListener('mousemove', mousecords)
	can.addEventListener('mouseup', function (e) {
		if (place(e)) {
			started = true
		}
	})

function mousecords(e) {
	var rect = can.getBoundingClientRect(),
  scaleX = can.width / rect.width
  scaleY = can.height / rect.height
  x = (e.clientX - rect.left) * scaleX
  y = (e.clientY - rect.top) * scaleY
}
	function buy(e) {

		for (var i = 0; i < defenses.length-1; i++) {
			if (x<=wh&&y>=dis*i&&y<=dis*(i+1)&&defenses[i].unlock<=currentLevel) {
				if ($$>=defenses[i].price&&defenses[i].waitTime<=0) {
					buying = defenses[i]
				}
			}
		}

		// Hammer
		if (x>hammerX&&x<hammerX2&&y>hammerY&&y<hammerY2) {
			buying=hammer
		}
	}
	function show(e) {
		if (buying) {
			image(buying.img,x-45,y-45,90,90)
		}
	}
	function place(e) {
		if (x<=disX||y<=disY||x>disX + offX*hor||y>disY+offY*ver) {
			buying=false
			return false
		}

		var col=Math.floor((x-disX)/offX)
		var row=Math.floor((y-disY)/offY)

		if (Grid[col][row].defense&&buying!==hammer) {
			buying=false
			return false
		}

		if (buying.ca) {
			Grid[col][row].ca=buying.ca
		}

		if (buying&&buying!==hammer) {
			Grid[col][row].defense=buying.name
			$$-=buying.price
			Grid[col][row].hp=buying.hp
			Grid[col][row].speed=buying.speed
			buying.waitTime=buying.time
			buying=false
			return true
		}

		else if (buying==hammer) {
			Grid[col][row].defense=''
			buying=false
			return true
		}
	}
function waitTime() {
	for (var i = 0; i < defenses.length-1; i++) {
		if (defenses[i].unlock<=currentLevel) {
			c.globalAlpha = 0.5;
			if (!($$>=defenses[i].price)) {
				rect(4,3+(dis)*i,wh-10,dis-10,'rgb(0,0,0)')
			}
			rect(4,3+(dis)*i,defenses[i].waitTime/defenses[i].time*(wh-10),dis-10,'rgb(0,0,0)')
			c.globalAlpha = 1;
			if (defenses[i].waitTime>=0) {
				defenses[i].waitTime--
			}
		}
	}
}
// var n = defenses.indexOf(buying)
// Money
	function money() {
		image(moneyimage, 160, 5, 100, 75)
		c.font= '30px font';
		fillStyle('white')
		var temp = $$
		if (temp>=10000) {
			temp='∞'
		}
        c.fillText(temp,170,35);
	}

// Hammer

function hammerimg() {
		image(moneyimage, 270, 5, 75, 75)
		image(hammer, 280, 5, 35, 35)
}
function progress() {
	function test(argument) {
		if (r/level[currentLevel][level[currentLevel].length-1].after*246>246) {
			return 246
		} else {
			return r/level[currentLevel][level[currentLevel].length-1].after*246
		}
	}
	function wave(r) {
		r=r/level[currentLevel][level[currentLevel].length-1].after*246
		r+=700
		rect(r, 12, 3, 21, 'green')
	}
	rect(694,7,254,29,'grey')
	rect(700,12,test(),21,'black')
	for (var i = 0; i < level[currentLevel].length; i++) {
		wave(level[currentLevel][i].after-1)
	}
}
function showLevel() {
	c.font= '30px font';
	fillStyle('white')
	var x = can.width
	var y = height - 10
	if (can.width>1300) {
		x=1300
	}
	if (can.height<height) {
		y=can.height-40
	}
    c.fillText('level: ' + (currentLevel+1),x-140,y);
}
function showPause() {
	var x = can.width
    var y = -30
    if (can.width>1180) {
        x=1180
    }
    image(pause[0],x,y,150,150)
    /*
    if click between
    1217 12
    and
    137 78
    switch knopje
    */
}

addEventListener('click', function () {
	if (x>1215&&y>10&&x<1290&&y<78) {
		pauseIfPausing()
	}
})
addEventListener('keyup', function (e) {
	if (e.key=='p'||e.key==' ') {
		pauseIfPausing()
	}
})
function pauseIfPausing() {
	if (!pausing) {
		doPause()
		pausing=true
	} else {
		start()
		pausing=false
	}
}
function doPause() {
	var x = can.width
    var y = -30
    if (can.width>1180) {
        x=1180
    }
	image(pause[1],x,y,150,150)
	stop()
}
