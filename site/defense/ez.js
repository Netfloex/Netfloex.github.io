// Lui
    var log = console.log

    var getId = document.getElementById

    var getClass= document.getElementsByClassName

    function loadScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }

    // Math
        function cos(cos) {
            return Math.cos(cos)
        }

        function sin(sin) {
            return Math.sin(sin)
        }

// Ez functions
    function capFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function zero(hms) {
        if (hms < 10) {
            return '0' + hms;
        }
        return hms;
    }
    function zerozero(ms) {
        if (ms < 100) {
            return '0' + ms;
        } else if (ms<10) {
            return '00' + ms;
        }
        return ms;
    }
    
    domainExtension()
    function domainExtension() {
        var tokens = document.domain.split('.');
        location.ext = tokens[tokens.length - 1]
        location.sub = tokens[tokens.length - 3]
    }

    function newImage(vaar, image, ext) {
        if (!image) {
            vaar = new Image();
            vaar.src = vaar + '.png'
        }
        else if (ext) {
            vaar = new Image();
            vaar.src = image + '.' + ext
        }
        else if (image) {
            vaar = new Image();
            vaar.src = image + '.png'
        }
        
        return vaar
    }

//canvas
    function arc(x, y, w, col) {
        c.beginPath();
        c.arc(x, y, w, 0, Math.PI * 2, false);
        c.fillStyle = col;
        c.fill();
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

    function clear() {
        c.clearRect(0, 0, can.width, can.height)
    }
    function image(img,x,y,w,h) {
        c.drawImage(img,x,y,w,h)
    }
    function fillStyle(color) {
        c.fillStyle = color
    }
    var currentlyRunning = true;
    function start() {
        if (!currentlyRunning) {
            drawInterval = setInterval(draw)
            currentlyRunning = true
            return true
        } else {
            return false
        }
    }
    function stop() {
        clearInterval(drawInterval)
        currentlyRunning = false
    }
    function randomColor() {
        return "hsl(" + Math.floor(Math.random()*255) + ", 60%, 60%)";
    }
    function random(a,b) {
        b++
        return Math.floor(Math.random()*(b-a))+a
    }
    function coord() {
        can.addEventListener('click', function (e) {
            log(e.clientX,e.clientY)
        })
        return 'I will spam you coords now!'
    }