

var scroll = 0

wheel()
function wheel(e) {
  if (innerWidth<860) {
    scroll = 2
    e = undefined
  } else {
    scrollTo(0, 0)
  }

  if (e) {
    e = Math.sign(e.deltaY)
    scroll += e
    var min = 0
    var max = 2
    // console.log(scroll);
    if (scroll<0) {
      scroll= 0
      return
    }
    if (scroll>max) {
      scroll= max
      return
    }
  }

  var title = d(".titlediv").classList
  var car = document.querySelectorAll(".cards")
  var cards = []
  car.forEach(c=> {
    cards.push(c.classList)
  })
  if (scroll == 0) {
    title.remove("goup")
    cards.forEach(c=>{
      c.remove("fadein")
      c.add("fadeout")
    })
  } else {
    title.add("goup")
  }
  if (scroll == 1 ) {
    cards[0].remove("hidden")
    cards[0].remove("fadeout")
    setTimeout(function () {
      cards[0].add("fadein")
    },10)
  }
  if (scroll == 2) {
    cards.forEach(c=>{
      c.remove("hidden")
      c.remove("fadeout")
      setTimeout(function () {
        c.add("fadein")
      },10)
    })
  } else {
    cards.forEach(c=>{
      if (c==cards[0]) {
        return
      }
      c.remove("fadein")
      c.add("fadeout")
    })
  }
}
if (innerWidth>860) {
  var parentTouchArea = document.body
  var touchArea = document.getElementById("yeet")
  var myRegion = new ZingTouch.Region(parentTouchArea);

  var gesture = new ZingTouch.Swipe({
      numInputs: 1,
      maxRestTime: 1000,
  });

  myRegion.bind(touchArea, gesture, function(e){
    var ev = e.detail.data[0]
    if (ev.distanceFromOrigin<100) {
      return
    }
      // console.log(ev);
      // touchArea.innerHTML = (ev.currentDirection) + "<br>"
      var touchArea = d(".title")
    var r = ev.currentDirection
    if (r>315||r<=45) {
      // >
    } else if (r>=225){
      // \/
      wheel({deltaY:-1})
    } else if (r>=135){
      // <
    } else if (r>45){
      // ^
      wheel({deltaY:1})
    }
  });
}
addEventListener("wheel", wheel)
addEventListener("resize", function () {
  if (innerWidth>860) {
    scrollTo(0, 0)
  }
})
