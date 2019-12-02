var terrain = createArray(ter.width, ter.height)
for (var x = 0; x < ter.width; x++) {
  for (var y = 0; y < ter.height; y++) {
    terrain[x][y] = x+y + x*4
    terrain[x][y] = new Tile("grass", true)
    if (x==0 || y==0 || y == ter.height-1 || x == ter.width-1) {
      terrain[x][y] = new Tile("cobble", true)
    }
  }
}
var objects = [
  new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),
]

var riverStart = random(5, ter.width-6)
var riverOffset = 0
for (var i = 1; i < ter.height-1; i++) {
  var r = random(1,3)
  var corner = {}
  if (r==1) {
    var change = random(-1,1)
    riverOffset += change
    if (change==-1) {
      corner.l = true
    }
    if (change==1) {
      corner.r = "right"
    }

  } else {
    var change = undefined
  }
  if (!change) {
    corner.l = "side"
    corner.r = "sideR"
  }
  objects.push(new Water(riverStart + riverOffset, i))
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
      if (typeof y == "number") {
        return
      }
      var pos = {
        x: xi*(ter.block.width)+player.pos.x + ter.x,
        y: yi*(ter.block.width)+player.pos.y + ter.y
      }
      image(img.grass, pos.x, pos.y, ter.block.width, ter.block.width)
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
        x: mouse.x + player.pos.x,
        y: mouse.y + player.pos.y
      }, obj)) {
        mouse.select = {
          x: xi,
          y: yi
        }
        var ww = 3
        c.lineWidth = ww;
        rect(
          pos.x, // X
          pos.y, // Y
          ter.block.width-ww, // Width
          ter.block.width -ww, // Height
          "black",
          true
        )
      }
    })
  })
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
