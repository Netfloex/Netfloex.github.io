var overworld = createArray(ter.width, ter.height)
var underworld = createArray(ter.width, ter.height)

var terrainTypes = ["overworld", "underworld"]

overworld.type = "overworld"
overworld.bg = img.grass
overworld.bgname = "grass"
underworld.type = "underworld"
underworld.bg = img.stone
underworld.bgname = "stone"
var terrain = overworld
for (var x = 0; x < ter.width; x++) {
  for (var y = 0; y < ter.height; y++) {
    var sides = "cobble"
    var portal = "portal"
    // overworld
    var bg = overworld.bgname
    overworld[x][y] = new Tile(bg, {noHp:true})
    if (x==0 || y==0 || y == ter.height-1 || x == ter.width-1) {
      overworld[x][y] = new Tile(sides, {noHp:true, unplacable:true})
    }
    if (x== ter.width -1 && y<4&&y>=1) {
      overworld[x][y] = new Tile(portal, {noHp:true, unplacable:true})
    }


    // underworld
    var bg = "stoneTop"

    underworld[x][y] = new Tile(bg, {spawnOres: true})
    if (x==0 || y==0 || y == ter.height-1 || x == ter.width-1) {
      underworld[x][y] = new Tile(sides, {noHp:true})
    }
    if (x== 0 && y<4&&y>=1) {
      underworld[x][y] = new Tile(portal, {noHp:true, unplacable:true})
    }
    if (x== 1 && y<4&&y>=1) {
      underworld[x][y] = new Tile(underworld.bgname, {noHp:true, unplacable:true})
    }
  }
}

function toggleDim() {
  var index = terrainTypes.indexOf(terrain.type)
  // player.motion = {x:0,y:0}
  player.oldPos = {}
  player.oldRPos = {}
  if (index==0) {
    player.pos.x = 0
    player.rpos.x = -(can.width/2 - ter.block.width*1.5)
    index = 1
  } else if (index==1) {
    player.rpos.x = can.width-(can.width/2 + ter.block.width*1.5)
    player.pos.x = -ww+can.width
    index = 0
  }
  terrain = window[terrainTypes[index]]
}

var objects = [
  new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),
]

var riverStart = random(5, ter.width-6)
var riverOffset = 0
// var lakeStart = random(5, ter.height-10)
for (var i = 1; i < ter.height-1; i++) {
  // if (i>=lakeStart&&i<lakeStart+6) {
  //   for (var z = -3; z < 4; z++) {
  //     objects.push(new Water(riverStart + riverOffset + z, i, corner.m))
  //   }
  //   continue
  // }

  var r = random(1,3)
  var corner = {}

  if (r==1) {
    var change = random(-1,1)
    riverOffset += change
    if (change==-1) {
      corner.l = "tl"
      corner.r = "dRev"
      corner.m = "dRevTL"
      corner.e = "dr"
    }
    if (change==1) {
      corner.r = "tr"
      corner.l = "dRevDL"
      corner.m = "dRevTR"
      corner.e = "dl"
    }

  } else {
    var change = undefined
  }
  if (!change) {
    corner.l = "sl"
    corner.r = "sr"
  }
  objects.push(new Water(riverStart + riverOffset + change*-2, i, corner.e))
  objects.push(new Water(riverStart + riverOffset, i, corner.m))
  objects.push(new Water(riverStart + riverOffset-1, i, corner.l))
  objects.push(new Water(riverStart + riverOffset+1, i, corner.r))
}
objects.forEach(obj=>{
  if (terrain[obj.x]) {
    terrain[obj.x][obj.y] = obj
  }
})
function toCoords(block) {
  if (typeof block == "object") {
    return {
      x: block.x*ter.block.width + ter.block.width/2,
      y: block.y*ter.block.width + ter.block.width/2
    }
  } else {
    console.error("Geef goeie")
    return "error"
  }
}
Create.terrain = function () {
  terrain.forEach((x, xi)=>{
    x.forEach((y, yi)=>{
      var pos = {
        x: xi*(ter.block.width)+player.pos.x + ter.x,
        y: yi*(ter.block.width)+player.pos.y + ter.y
      }
      var bg = y.bg || terrain.bg
      image(bg, pos.x, pos.y, ter.block.width, ter.block.width)
      if (typeof y == "object") {
        c.globalAlpha = y.opacity +.5
        var w = ter.block.width
        if (y.type !== "tree") {

          image(
            y.img,
            pos.x,
            pos.y,
            w,
            w
          )
        }
        c.globalAlpha = 1
      }
      var obj = {
        x: pos.x,
        y: pos.y,
        width: ter.block.width,
        height: ter.block.width
      }
      if (isHitbox({
        x: mouse.screenX,
        y: mouse.screenY
      }, obj)) {
        mouse.select = {
          x: xi,
          y: yi
        }
        var ww = 3
        c.lineWidth = ww;
        rect(
          pos.x + ww/2, // X
          pos.y + ww/2, // Y
          ter.block.width-ww*1, // Width
          ter.block.width -ww*1, // Height
          "black",
          true
        )
      }
    })
  })
  if (terrain.type=="overworld") {
    objects.forEach((obj, i)=>{
      if (obj.type=="tree") {
        objects[i] = terrain[obj.x][obj.y]
        var pos = {
          x: obj.x*(ter.block.width)+player.pos.x + ter.x,
          y: obj.y*(ter.block.width)+player.pos.y + ter.y
        }
        var w = ter.block.width*2
        c.globalAlpha = obj.opacity/2 + .5
        image(img.tree, pos.x -w/2 + ter.block.width/2, pos.y -w/2 + ter.block.width/2, w, w)
        c.globalAlpha = 1
      }
    })
  }
}
Create.bubbles = function () {
  bubbles.forEach(bub => {
    bub.draw()
  })
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
  }
