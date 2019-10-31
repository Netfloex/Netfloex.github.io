var Counters = db.collection("counters")
var counts = Counters.doc("spamButton")

var count = 0

function update(c) {
  var data = c.data()
  d("#button").innerHTML = data.total
}
counts.onSnapshot(update)
var inc = {
  total: firebase.firestore.FieldValue.increment(1)
}

function add() {
  counts.update(inc)
}

var zt = new ZingTouch.Region(document.body);


var tap = new ZingTouch.Tap({
    maxDelay: 1000,
    tolerance: 50
})

zt.bind(d("button"), tap, function(e){
  add()
  updateBackground()
}, false);
