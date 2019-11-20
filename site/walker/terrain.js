var blocks = 50
var ww = (blocks)*50
var ter = {
  x: 0,
  y: 0,
  width : blocks,
  height : blocks,
  block: {
    width: 50
  }
}
var terrain = createArray(ter.width, ter.height)
var i = 0
for (var x = 0; x < ter.width; x++) {
  for (var y = 0; y < ter.height; y++) {
    terrain[x][y] = x+y + x*4
    terrain[x][y] = `hsl(${x*10}, 50%, 50%)`
  }
}

Create.terrain = function () {
  terrain.forEach((x, xi)=>{
    x.forEach((y, yi)=>{
      rect(
        xi*(ter.block.width)+player.pos.x + ter.x, // X
        yi*(ter.block.width)+player.pos.y + ter.y, // Y
        ter.block.width, // Width
        ter.block.width, // Height
        y // Color
      )
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
