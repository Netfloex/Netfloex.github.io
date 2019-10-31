d("#htmlExample").addEventListener("click", function () {
  var st = document.styleSheets
  for (var i = 0; i < st.length; i++) {
    st[i].disabled = !st[i].disabled
  }
  setTimeout(function () {
    var st = document.styleSheets
    for (var i = 0; i < st.length; i++) {
      st[i].disabled = false
    }
  },2000)
})
var arr = [
  "btn-primary",
  "btn-default",
  "btn-danger",
  "btn-info",
  "btn-warning"
]
d("#cssExample").addEventListener("click", function () {
  var r = random(0, arr.length-1)
  console.log(r);
  this.className = "btn " + arr[r]
  d(".divimg").style.backgroundImage = `url("https://picsum.photos/${innerWidth}/${innerHeight}/?random=${random(0,1000)}")`
})
function random(e, t) {
    return t++, Math.floor(Math.random() * (t - e)) + e
}
d("#javascriptExample").addEventListener("click", function () {
  this.focus()
})
d("#javascriptExample").addEventListener("keyup", function (e) {
  if (e.key=="Enter") {
    if (parseInt(this.value)) {
      var x = prompt("Keer hoeveel?")
      alert(`${this.value}*${x} = ${this.value*x}`)
    } else {
      this.value = `Das geen nummer`
    }
  }
})
