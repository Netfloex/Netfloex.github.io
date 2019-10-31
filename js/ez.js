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
