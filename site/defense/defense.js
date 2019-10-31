// Draw (Calls other functions)
function draw() {
    clear();
    grid(7, 10)
    side(7)
    money()
    show()
    KOOPA()
    hitpoints()
    hammerimg()
    progress()
    waitTime()
    field()
    showLevel()
    showPause()
    showHacks()
}

// Other functions
function grid(sizeX, sizeY) {
    image(background, -100, 0, 1400, 700)
    var d = 5
    var c = 'green'
    var col = ['#43a047', '#66bb6a', '#4caf50', '#43a047', '#4CAF50', '#4caf50', '#43a047']
    for (var i = 0; i < 8; i++) {
        rect(disX + offX * i, disY, disX - 20, offY * ver, col[i])
    }
    for (var i = 0; i < sizeX; i++) {
        stroke(disX, disY + offY * i, disX + offX * hor, disY + offY * i, d, c)
    }
    for (var j = 0; j < sizeY; j++) {
        stroke(disX + offX * j, disY, disX + offX * j, offY * ver + disY, d, c)
    }


    for (var i = 0; i < hor; i++) {
        for (var j = 0; j < ver; j++) {

            if (Grid[i][j].defense == 'cannon') {

                if (!Grid[i][j].ca) {
                    Grid[i][j].ca = Cannon.ca
                }

                image(cannon[Grid[i][j].ca].img, Grid[i][j].x, Grid[i][j].y, 90, 90)

                if (!Grid[i][j].speed) {
                    Grid[i][j].speed = Cannon.speed
                } else {
                    Grid[i][j].speed--;
                    if (Grid[i][j].speed <= 0 && testKoopa(Grid[i][j].y)) {
                        cannonballs.push({
                            'x': Grid[i][j].x,
                            'y': Grid[i][j].y,
                            'lifespan': 0
                        })
                        Grid[i][j].ca = (Grid[i][j].ca + 1) % 4
                    }
                }

            }
            if (Grid[i][j].defense == 'gold') {
                image(goldmine, Grid[i][j].x, Grid[i][j].y - 5, 90, 90)

                if (!Grid[i][j].speed) {
                    Grid[i][j].speed = Gold.speed
                } else {
                    Grid[i][j].speed--;
                    if (Grid[i][j].speed == 0) {
                        golds.push({
                            'x': Grid[i][j].x,
                            'y': Grid[i][j].y,
                            'lifespan': 0
                        })
                    }
                }

            }

            if (Grid[i][j].defense == 'thorns') {
 				if ((Grid[i][j].hp / Thorns.hp) < 0.33) {
 					Grid[i][j].ca = 2
 				}
			    else if ((Grid[i][j].hp / Thorns.hp) > 0.33) {
			        Grid[i][j].ca = 1
			    }
			    else if ((Grid[i][j].hp / Thorns.hp) > 0.66) {
			        Grid[i][j].ca = 0
			    }
			    image(thorns[Grid[i][j].ca], Grid[i][j].x, Grid[i][j].y, 90, 90)
            }

            if (Grid[i][j].defense=='wall') {
            	image(wall, Grid[i][j].x, Grid[i][j].y, 90, 90)
            }
            if (Grid[i][j].hp <= 0) {
			        Grid[i][j].defense = ''
            }
        }
    }
}


function testKoopa(y) {
    for (var i = 0; i < koopas.length; i++) {
        if (y == koopas[i].y) {
            return true
        }
    }
    return false
}

var minTime=4000
var maxTime=8000
var Time=0
// Field
function field() {
    for (var i = 0; i < cannonballs.length; i++) {
        image(cannonball, cannonballs[i].x, cannonballs[i].y, 100, 100)
        cannonballs[i].x++
            if (cannonballs[i].x > can.width + 100) {
                cannonballs.shift()
            }
    }

    for (var i = 0; i < golds.length; i++) {
        image(gold, golds[i].x, golds[i].y, 100, 100)
        golds[i].lifespan++
            if (golds[i].lifespan > 7500) {
                golds.shift()
            }
        if (golds[i].lifespan < 700) {
            if (!golds[i].random) {
            	golds[i].y -= 0.09
            } else {
            	golds[i].y += 0.5
            }
        }
    }
    Time++
    if (Math.random() > .999&&Time>minTime) {
        spawnGold()
    }
    if (Time==maxTime) {
    	spawnGold()
    }
    function spawnGold() {
    	if (started) {
	    	golds.push({
	            'x': random(300,990),
	            'y': -70,
	            'lifespan': random(600,-400),
	            'random':true
	        })
	        Time=0
	    }
    }
}
var drawInterval
onload = function () {
    drawInterval = setInterval(draw)
}
can.addEventListener('click', getGold)

function getGold() {
    for (var i = 0; i < golds.length; i++) {
        if (golds[i].x - 50 < x && golds[i].x + 140 > x && golds[i].y - 20 < y && golds[i].y + 140 > y) {
            golds.splice(i, 1);
            $$ += Gold.money
            started = true
        }
    }
}


function gameOver() {
    alert('You ded')
    resetVars()
}
var oneTime = true

var showInterval
function win() {
	for (var i = 0; i < defenses.length-1; i++) {
		if (defenses[i].unlock==currentLevel) {
			winning=defenses[i+1].buy
			showInterval = setInterval(showWin)
		}
	}
    setTimeout(function() {
        if (oneTime) {
			resetVars()
			currentLevel++
			for (var i = 0; i < defenses.length-1; i++) {
				if (defenses[i].unlock==currentLevel) {
					alert('You have ' + defenses[i].name + ' unlocked!')
				}
			}

			oneTime = false
			clearInterval(showInterval)
        }
    }, 1000)
    oneTime=true
}
function showWin() {
	if (winning) {
		image(winning,can.width-900,can.height-600,600,600)
	}
}
$(window).focus(start)
$(window).blur(doPause)
