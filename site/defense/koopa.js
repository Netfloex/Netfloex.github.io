function KOOPA() {
	if (started) {
		r++
	}
	for (var i = 0; i < level[currentLevel].length; i++) {
		if (r==level[currentLevel][i].after) {
			for (var j = 0; j < level[currentLevel][i].amount; j++) {
				if (level[currentLevel][i].k>499) {
					var hp =300
				} else {
					var hp = 200+level[currentLevel][i].k*200;
				}

					koopas.push({
						'koopa':level[currentLevel][i].k,
						'hp':hp,
						'x':width-30+Math.random()*60,
						'y':Grid[0][Math.floor(Math.random()*6)].y,
						'dead':false,
						'deadTime':1000
					})
			}
		}
	}
	
	for (var i = 0; i < koopas.length; i++) {
		if (!isEating(koopas[i])) {
			koopas[i].x-=.05;
		}
		// !koopas[i].eating
		c.save()
		c.translate(koopas[i].x,koopas[i].y+koopas[i].eatY)
		if (koopas[i].dead) {
			c.rotate(-90*Math.PI/180)
			c.translate(-130,0)
			koopas[i].deadTime--
		}
		image(koopa[koopas[i].koopa], 0,0, 100,100)
		c.restore()



		if (koopas[i].x+50<disX) {
			gameOver()
		}
		if (koopas[i].deadTime<=0) {
			koopas.splice(i, 1)
		}

	}
	if (koopas.length == 0&&r>level[currentLevel][level[currentLevel].length-1].after+50) {
		win()
	}
}
function hitpoints() {
	for (var j = 0; j < koopas.length; j++) {
		for (var i = 0; i < cannonballs.length; i++) {
		
			if (cannonballs[i].x-20<koopas[j].x&&
				cannonballs[i].x+20>koopas[j].x&&
				cannonballs[i].y-20<koopas[j].y&&
				cannonballs[i].y+20>koopas[j].y) {
				
				koopas[j].hp-=Cannon.damage;
				cannonballs.splice(i, 1)
				
			}
		}
		if (koopas[j].hp<=0) {
			koopas[j].dead = true;
			// koopas.splice(j, 1)
		}
	}
}
function isEating(k) {
	if (k.dead) {
		return true
	}
	for (var x = 0; x < hor; x++) {
		for (var y = 0; y < ver; y++) {
			var tg = Grid[x][y]
			if (!tg.defense==''){
				if (tg.x+offX>k.x+50&&tg.x<k.x+50&&tg.y==k.y) {
					// k.eating=true
					k.eatY= (k.eatY-1)%20
					tg.hp--
					if (tg.defense=='thorns'&&k.koopa!==1000) {
						k.hp--
					}
					if (k.koopa==1000) {
						tg.hp--
					}
					return true
				}
			}
		}
	}
	// k.eating=false
	k.eatY=0
	return false
}