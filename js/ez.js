var d = document.querySelector.bind(document)

function random(e, t) {
    return t++, Math.floor(Math.random() * (t - e)) + e
}
function arc(x, y, w, col, stroke) {
    c.beginPath();
    c.arc(x, y, w, 0, Math.PI * 2, false);
    c.fillStyle = col;
    c.strokeStyle = col;
    if (!stroke) {
      c.fill();
    } else {
      c.stroke()
    }
    c.closePath();
}

function stroke(x, y, x2, y2, w, col) {
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x2, y2);
    c.lineWidth = w;
    c.strokeStyle = col;
    c.stroke();
}

function rect(x, y, w, h, col, fill) {
    c.beginPath();
    c.rect(x, y, w, h);
    if (!fill) {
        c.fillStyle = col;
        c.fill()
    } else {
        c.strokeStyle = col
        c.stroke()
    }
}
function rotate(deg) {
   c.rotate(deg*Math.PI/180)
}
function clear() {
    c.clearRect(0, 0, can.width, can.height)
}
function image(img,x,y,w,h) {
    c.drawImage(img,x,y,w,h)
}
function newImage(url) {
  var img = new Image()
  img.src = url + ".png"
  return img
}
function zero(hms) {
        if (hms < 10) {
            return '0' + hms;
        }
        return hms;
    }
function dist(x1,y1,x2,y2) {
    var x=x1-x2
    var y=y1-y2
    var ans = Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
    if (ans<0) {
        ans=-ans
    }
    return ans
}
function timeSpent(d, full) {
  if (!d.getDate||d=="Invalid Date") {
    console.error("Ja maar godver, deze functie moet een tijd dinges krijgen, niet wat jij nu voorschoteld.");
    return
  }
  if ((new Date() - d)<0) {
    console.error("Toekomst doe ik niet aan. Dat doe ik wel in de toekomst.")
    return "Its a trap"
  }
  var d = new Date(new Date() - d)
  var jj = d.getFullYear() - 1970
  var mm = d.getMonth()
  var dd = d.getDate() -1
  var h = d.getHours() -1
  var m = d.getMinutes()
  var s = d.getSeconds()
  var timeTable = {
    s : ["Seconde", "Seconden"],
    m : ["Minuut", "Minuten"],
    h : ["Uur", "Uur"],
    dd : ["Dag", "Dagen"],
    mm : ["Maand", "Maanden"],
    jj : ["Jaar", "Jaar"],
  }
  function num(t) {
    if (t==1) {
      return 0
    } else {
      return 1
    }
  }
  function hide(m) {
    if (!full) {
      return ""
    } else {
      return m
    }
  }
  if (s==0&&m<1&&h<1&&dd<1&&mm<1) {
    return "Nu"
  } else if (m<1&&h<1&&dd<1&&mm<1) {
    return `${s} ${timeTable.s[num(s)]}`
  } else if (h<1&&dd<1&&mm<1) {
    return `${m} ${timeTable.m[num(m)]}` +  hide(` en ${s} ${timeTable.s[num(s)]}`)
  } else if (dd<1&&mm<1) {
    return `${h} ${timeTable.h[num(h)]}` + hide(` en ${m} ${timeTable.m[num(m)]}`)
  } else if (mm<1) {
    return `${dd} ${timeTable.dd[num(dd)]}` + hide(` en ${h} ${timeTable.h[num(h)]}`)
  } else if (jj<1) {
    return `${mm} ${timeTable.mm[num(mm)]}` + hide(` en ${dd} ${timeTable.dd[num(dd)]}`)
  } else {
    return `${jj} ${timeTable.jj[num(jj)]}` + hide(` en ${mm} ${timeTable.mm[num(mm)]}`)
  }
}
