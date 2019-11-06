var hacks = {};
var hacksOn = []
var temp$$
hacks.giveMoney = function() {
    if ($$>=10000) {
        $$=temp$$
    }
    else {
        temp$$=$$
        $$=20000
    }
}
hacks.fullDef = function(defense) {
    for (var i = 0; i < hor; i++) {
        for (var j = 0; j < ver; j++) {
            Grid[i][j].defense = defense
        }
    }
}
var collectInterval
hacks.autoCollect = function() {
    if (!collectInterval) {
            collectInterval = setInterval(function() {
            if (golds.length > 0) {
                golds.pop()
                $$ += Gold.money
            }
        })
        hacksOn.push(hackIcons[0])
    } else {
        var index = hacksOn.indexOf(hackIcons[0]);
        if (index > -1) {
            hacksOn.splice(index, 1);
        }
        clearInterval(collectInterval)
        collectInterval=false

    }
}
hacks.attack = function() {
    for (var j = 0; j < 5; j++) {
        koopas.push({
            'koopa': 0,
            'hp': 200,
            'x': can.width + random(-400,0),
            'y': Grid[0][Math.floor(Math.random() * ver)].y,
            'dead':false,
            'deadTime':1000
        })
    }
}
hacks.clear = function() {
    koopas = []
    cannonballs=[]

}
hacks.goldSpeed = function() {
    if (Gold.speed>500) {
        Gold.speed=100
        hacksOn.push(hackIcons[1])
    }
    else if (Gold.speed<=500) {
        Gold.speed=2500;
        var index = hacksOn.indexOf(hackIcons[1]);
        if (index > -1) {
            hacksOn.splice(index, 1);
        }

    }
}
hacks.damage = function() {
    if (Cannon.damage<=10) {
        Cannon.damage=100
        hacksOn.push(hackIcons[2])
    }
    else if (Cannon.damage>10) {
        Cannon.damage=10;
        var index = hacksOn.indexOf(hackIcons[2]);
        if (index > -1) {
            hacksOn.splice(index, 1);
        }
    }
}
hacks.jonarhap = function() {
    for (var i = 1; i <= 4; i++) {
        koopa.push({ 'img': new Image() })
        koopa[i - 1].img.src = 'jonarhap.png'
    }
}
hacks.verrassing = function() {
    for (var i = 1; i <= 4; i++) {
        koopa.push({ 'img': new Image() })
        koopa[i - 1].img.src = 'peer.png'
    }
}
hacks.fakeGold = function() {
    for (var i = 1; i <= 4; i++) {
        koopa.push({ 'img': new Image() })
        koopa[i - 1].img.src = 'gold.png'
    }
}
hacks.mol = function() {
    for (var i = 1; i <= 4; i++) {
        koopa.push({ 'img': new Image() })
        koopa[i - 1].img.src = 'mole.png'
    }
}
hacks.time = function () {
    for (var i = 0; i < defenses.length; i++) {
        defenses[i].time=0
        defenses[i].waitTime=0
    }
}
hacks.god = function () {
    hacks.time();
    hacks.giveMoney()
}
hacks.skip = function () {
    for (var i = 0; i < defenses.length; i++) {
        defenses[i].waitTime=0
    }
}
addEventListener('keyup', function (e) {
    if (e.key=='g') {
        hacks.god()
    }
    if (e.key=='c') {
        hacks.clear()
    }
    if (e.key=='a') {
        hacks.autoCollect()
    }
    if (e.key=='l') {
        hacks.goldSpeed()
    }
    if (e.key=='k') {
        hacks.damage()
    }
    if (e.key=='s') {
        hacks.skip()
    }
    if (e.key=='h') {
        toggleMenu()
    }
    if (e.key=='t') {
        hacks.attack()
    }
    if (e.key=='f') {
        hacksMenu.classList.add('visible')
        content.classList.remove('visible')
        fullDef.classList.add('visible')
    }
})
function showHacks() {
    for (var i = 0; i < hacksOn.length; i++) {
        image(hacksOn[i],1230,80+i*60,50,50)
    }
    var x = 30
    var y = height-30
    var wh = 100
    image(useHacks, x, y-wh/2,wh,wh)
}
addEventListener('click', function (e) {
    if (hacksMenu.classList[0]=='visible'&&e.target==can) {
        toggleMenu()
    }
    else if (x>32&&y>643&&x<123&&y<690) {
        toggleMenu()
    }
})
document.getElementById('x').addEventListener('click',function () {
    toggleMenu()
})
function toggleMenu() {
    hacksMenu.classList.toggle('visible')
    content.classList.add('visible')
    fullDef.classList.remove('visible')
}
hacks.typeFullDef = function () {
    content.classList.toggle('visible')
    fullDef.classList.toggle('visible')
}

var defenseListString = 'Klik op een van de onderstaande shit.<br>'
for (var i = 0; i < defenses.length-1; i++) {
    defenseListString+='<a href="#" onclick="hacks.fullDef("' + defenses[i].name + '")">' + capFirst(defenses[i].name)+ '</a><br>'
}
defenseList.innerHTML = defenseListString
