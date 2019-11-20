var terrain = createArray(ter.width, ter.height)
for (var x = 0; x < ter.width; x++) {
  for (var y = 0; y < ter.height; y++) {
    terrain[x][y] = x+y + x*4
    terrain[x][y] = `hsl(${x*10}, 50%, 50%)`
  }
}
var objects = [
  new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),new Tree(),
]
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
      var col = y
      if (typeof y == "object") {
        var col = y.color
      }
      var pos = {
        x: xi*(ter.block.width)+player.pos.x + ter.x,
        y: yi*(ter.block.width)+player.pos.y + ter.y
      }
      rect(
        pos.x, // X
        pos.y, // Y
        ter.block.width, // Width
        ter.block.width, // Height
        col // Color
      )
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
