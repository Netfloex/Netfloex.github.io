var blocks = 30
var ter = {
  x: 0,
  y: 0,
  width : blocks,
  height : blocks,
  block: {
    width: can.width/16 // Dit is eigenlijk in walker.js bij resize
  }
}
var ww = (blocks)*ter.block.width
var hotbarItems = Array.from(document.querySelectorAll(".hotbarItem"))

var overworldAnimals = [
  "cow",
  "sheep"
]
var unwalkableTiles = [
  "wood",
  "stoneTop",
  "cobble",
  "tree",
  "log"
]
var craftables = [
  {
    in: [
      {
        type: "log",
        count: 1
      }
    ],
    out: {
      type: "wood",
      count: 4
    }
  },
  {
    in: [
      {
        type: "wood",
        count: 2
      }
    ],
    out: {
      type: "stick",
      count: 4
    }
  },
  {
    in: [
      {
        type: "stick",
        count: 2
      },
      {
        type: "wood",
        count: 1
      }
    ],
    out: {
      type: "axe",
      count: 1
    }
  }
]
var itemsList = {
  log: {
    placable: true,
    hotbar: true,
  },
  cow: {
    placable: false,
    hotbar: false,
  },
  sheep: {
    placable: false,
    hotbar: false,
  },
  stick: {
    placable: false,
    hotbar: false,
  },
  beef: {
    hotbar: true,
    placable: false
  },
  axe: {
    hotbar: true,
    placable: false
  },
  diaOre: {
    placable: true,
    hotbar: true,
  },
  wood: {
    placable: true,
    hotbar: true,
  }
}
