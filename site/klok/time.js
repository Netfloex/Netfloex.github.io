var hours = d("#hours")
var minutes = d("#minutes")
var seconds = d("#seconds")

var tminutes = d("#tminutes")
var text = d("#text")
var thours = d("#thours")

var start = new Date()

function time(d) {
  var d = new Date()
  var h = d.getHours()
  var m = d.getMinutes()
  var s = d.getSeconds()


  changeHTML(hours, h)
  changeHTML(minutes, m)
  changeHTML(seconds, s)

  h = amPM(h)

  if (m>=45) {
    changeHTML(thours, h+1, true)
  } else {
    changeHTML(thours, h, true)
  }
  if (m>45) {
    changeHTML(text, "Voor")
    changeHTML(tminutes, 60-m, true)
  } else if (m==45) {
    changeHTML(tminutes, "Kwart")
    changeHTML(text, "Voor")
  } else if (m>=30) {
    changeHTML(text, "Over Half")
    changeHTML(tminutes, m-30, true)
  } else if (m>=15) {
    changeHTML(tminutes, 30-m, true)
    changeHTML(text, "Voor")
  } else if (m==15) {
    changeHTML(text, "Over")
    changeHTML(tminutes, "Kwart")
  } else if (m<15) {
    changeHTML(tminutes, m, true)
    changeHTML(text, "Over")
  }
  var dotss = document.querySelectorAll(".dot")
  dotss.forEach(c=> {
    setTimeout(function () {
      c.classList.add("switch")
      setTimeout(function () {
        c.classList.remove("switch")
      }, 300)
    }, 700)
  })

  setTimeout(time, 1000-d.getMilliseconds())
}
function changeHTML(elem, html, zeros) {
  if (!zeros) {
    html = zero(html)
  }
  if (elem.innerHTML!==html+ ''.replace(/"/g, "")) {
    elem.innerHTML=html
    if (new Date()-start<500) {
      return
    }
    setTimeout(function () {
      elem.classList.add("switch")
      setTimeout(function () {
        elem.classList.remove("switch")
      },300)
    }, 700)
  }
}
function amPM(twelve) {
  twelve = JSON.parse(twelve)
  if (twelve>12) {
    return twelve - 12
  }
  return twelve
}
time()
