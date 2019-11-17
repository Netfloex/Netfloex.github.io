var can = d("#canvas")
var c = can.getContext("2d")

can.width = 1920
can.height= 869

function resize() {
  var wrap = d("#wrap")
  var gameArea = d('#wrap');
  var widthToHeight = innerWidth/innerHeight
  var newWidth = innerWidth;
  var newHeight = innerHeight;
  var newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      gameArea.style.height = newHeight + 'px';
      gameArea.style.width = newWidth + 'px';
  } else {
      newHeight = newWidth / widthToHeight;
      gameArea.style.width = newWidth + 'px';
      gameArea.style.height = newHeight + 'px';
  }

  gameArea.style.marginTop = (-newHeight / 2) + 'px';
  gameArea.style.marginLeft = (-newWidth / 2) + 'px';
}
var running = true
resize()
addEventListener("resize", resize)
