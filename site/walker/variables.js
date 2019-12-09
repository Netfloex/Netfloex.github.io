var blocks = 30
var ter = {
  x: 0,
  y: 0,
  width : blocks,
  height : blocks,
  block: {
    width: can.width/16
  }
}
var ww = (blocks)*ter.block.width

var craftables = [
  {
    in: [
      {
        type: "wood",
        count: 1
      }
    ],
    out: {
      type: "stick",
      count: 4
    }
  }
]
