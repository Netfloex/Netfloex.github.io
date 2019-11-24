var terrain = createArray(ter.width, ter.height)
for (var x = 0; x < ter.width; x++) {
  for (var y = 0; y < ter.height; y++) {
    terrain[x][y] = x+y + x*4
    terrain[x][y] = new Grass()
    if (x==0 || y==0 || y == ter.height-1 || x == ter.width-1) {
      terrain[x][y] = {
        img: img.cobble
      }
    }
  }
}
var objects = [
  new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),
]

var riverStart = random(5, ter.width-6)
var riverOffset = 0
for (var i = 1; i < ter.height-1; i++) {
  var r = random(1,10)
  if (r==1) {
    riverOffset += random(-1,1)
  }
  objects.push({
    x: riverStart + riverOffset,
    y: i,
    img: img.water
  })
  objects.push({
    x: riverStart + riverOffset -1 ,
    y: i,
    img: img.water
  })
  objects.push({
    x: riverStart + riverOffset +1 ,
    y: i,
    img: img.water
  })
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
      var obj = {
        x: pos.x,
        y: pos.y,
        width: ter.block.width,
        height: ter.block.width
      }
      image(img.grass, pos.x, pos.y, 100, 100)
      if (isHitbox({
        x: mouse.x + player.pos.x,
        y: mouse.y + player.pos.y
      }, obj)) {
        mouse.select = {
          x: xi,
          y: yi
        }
        c.lineWidth = 1;
        rect(
          pos.x, // X
          pos.y, // Y
          ter.block.width-1, // Width
          ter.block.width -1, // Height
          "black",
          true
        )
      }
      if (typeof y == "object") {
        c.globalAlpha = y.opacity
        image(
          y.img,
          xi*(ter.block.width)+player.pos.x + ter.x,
          yi*(ter.block.width)+player.pos.y + ter.y,
          100,
          100
        )
        c.globalAlpha = 1
      }
    })
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
