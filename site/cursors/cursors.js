var can = d("#canvas")
var c = can.getContext("2d")

function resize() {
  can.width = innerWidth
  can.height = innerHeight
}
resize()
addEventListener("resize", resize)

var cursors = {}

var cur = db.collection("cursors")
var me = cur.doc("_"+random(0,1000))

cur.onSnapshot(updateCursors)

function updateCursors(c) {
  cursors = {}
  c.docs.forEach(doc => {
    var t = doc.data().lastUpdate
    if (t) {
      var time = new Date()/1000 - t.seconds

      if (time>30) {
        cur.doc(doc.id).delete()
        delete cursors[doc.id]
      }
    }
    cursors[doc.id] = doc.data()
  })
}

function loop() {
  clear()
  var keys = Object.keys(cursors)
  keys.forEach(k => {
    arc(cursors[k].x, cursors[k].y, 10, "green")
  })
  // cur.get().then(d=>{updateCursors(d)})
  requestAnimationFrame(loop)
}
loop()


var zt = new ZingTouch.Region(document.body);

zt.bind(can, "pan", function(e){
  // console.log(e.detail)
  var pos = e.detail.events[0]
  if (pos.x&&pos.y) {
    var cursor = {
      x: pos.x,
      y: pos.y,
      lastUpdate: firebase.firestore.Timestamp.fromDate(new Date())
    }
    me.set(cursor)
  }
}, false);
