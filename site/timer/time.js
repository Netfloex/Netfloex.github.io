var hours = d("#hours")
var minutes = d("#minutes")
var seconds = d("#seconds")

var ttime = d("#ttime")
var text = d("#text")

var and = d("#and")

var ttime2 = d("#ttime2")
var text2 = d("#text2")

var start = new Date()

function time(d) {
  var d = new Date(new Date() - start)
  var h = d.getHours() -1
  var m = d.getMinutes()
  var s = d.getSeconds()


  changeHTML(hours, h)
  changeHTML(minutes, m)
  changeHTML(seconds, s)

  if (m<1&&h<1) {
    showSeconds(false , s)
    changeHTML(and, "", true)
    showSeconds(1, "")
  } else if (h<1) {
    changeHTML(and, " en ")
    showMinutes(false, m)
    showSeconds(1, s)
  } else {
    changeHTML(and, " en ")
    showHours(false, h)
    showMinutes(1, m)
  }

  var dotss = document.querySelectorAll(".dot")
  dotss.forEach(c=> {
    setTimeout(function () {
      c.classList.add("grow")
      setTimeout(function () {
        c.classList.remove("grow")
      }, 300)
    }, 700)
  })

  setTimeout(time, 1000-d.getMilliseconds())
}
function showSeconds(par, s) {
  var t = ttime
  var tt = text
  if (par) {
    t = ttime2
    tt = text2
  }
  var mv = "Seconden"
  var ev = `Seconde`
  if (!s&&s!==0) {
    mv = ""
    ev = ""
  }
  changeHTML(t, s, true)
  if (!s&&s!==0) {
    s = true
  }
  changeHTML(tt, mv, s, ev)
}
function showMinutes(par, m) {
  var t = ttime
  var tt = text
  if (par) {
    t = ttime2
    tt = text2
  }
  changeHTML(t, m, true)
  changeHTML(tt, "Minuten", m, `Minuut`)
}
function showHours(par, h) {
  var t = ttime
  var tt = text
  if (par) {
    t = ttime2
    tt = text2
  }
  changeHTML(t, h, true)
  changeHTML(tt, "Uur")
}
function changeHTML(elem, html, zeros, change) {
  if (!elem) {
    console.log(`elem`, `bestaat niet`);
    return
  }
  if (!zeros) {
    html = zero(html)
  }
  if (zeros==1&&change) {
    html = change
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
