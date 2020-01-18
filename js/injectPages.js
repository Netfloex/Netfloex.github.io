var d = document.querySelector.bind(document)
var aEL = addEventListener

var lc = location
var h = lc.host

var script = [
  {
    host : "accounts.magister.net",
    fun: function () {
      d("body").addEventListener("change", function (e) {
        if (e.target.id=="rswp_password") {
          if (e.target.value.length>5) {
            setTimeout(function () {
              d("#rswp_submit").click()
            },100)
          }
        }
      })
    }
  }
]

var y = script.filter(s=>s.host==h)[0]
if (y) {
  y.fun()
}
