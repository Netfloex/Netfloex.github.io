var count = 0
function add(c) {
  var data = c.data()
  d("#button").innerHTML = data.total
  count++
}
db.collection("counters").doc("spamButton").onSnapshot(add)

new ZingTouch.Region(document.body).bind(d("button"), new ZingTouch.Tap({
    maxDelay: 1000,
    tolerance: 50
}), function(e){
  if (e) {
    db.collection("counters").doc("spamButton").update({
      total: firebase.firestore.FieldValue.increment(1)
    })
    updateBackground()
  }
}, false);
