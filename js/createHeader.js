var d = document.getElementById.bind(document)
var c = document.createElement.bind(document)

Header.forEach(i=>{
  var ali = c("LI")
  ali.className = "ali"
  var title = c("BUTTON")
  title.className = "btn btn-lg btn-primary"
  title.innerHTML = i.title
  ali.appendChild(title)
    var ul = c("UL")
    ul.className = "bul"
      if (typeof i.menu == "object") {
        i.menu.forEach(m=> {
          var bli = c("LI")
          bli.className = "bli"
            var btn = c("BUTTON")
            btn.className = "btn btn-lg btn-default"
            btn.innerHTML = m.title
            if (m.desc) {
              btn.title = m.desc
            }
            if (m.link) {
              var a = c("A")
              a.href = m.link
              a.appendChild(btn)
              btn = a
            }
            bli.appendChild(btn)
          ul.appendChild(bli)
        })
      }
    ali.appendChild(ul)
  d("headerUl").appendChild(ali)
})

d("fullScreenBox").addEventListener("click", function (e) {
  if (e.ctrlKey) {
    if (page[0]) {
      location.pathname = `site${page[0].href}`
    } else {
      location.hash = 404
    }
    return
  }
  toggleFullscreen()
  d("fullScreenIcon").classList.toggle("fa-compress")
  d("fullScreenIcon").classList.toggle("fa-expand")
})

// Adapted from https://gist.github.com/demonixis/5188326
function toggleFullscreen(event) {
  var element = document.body;

	var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

	element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
	document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };

	isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}
