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
