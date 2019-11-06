function headerHeight() {
  var i = d("header").style.height.replace("px","")
  if (parseInt(i)) {
    return parseInt(i)
  } else if (!i) {
    return 100
  }
  return console.log("error");
}

var create = {}
var page = "none"
create.Title = function (text) {
  var title = c("h1")
  title.className = "display-3 "
  title.innerHTML = text
  return title
}
create.Iframe = function (link) {
  var iframe = c("iframe")
  var lc = location
  iframe.src = lc.protocol + "//" + lc.host  + link
  // iframe.src = link
  iframe.className = "iframe"
  iframe.id = "iframe"
  iframe.height = innerHeight - headerHeight()
  // iframe.onload = function () {
  //   var g = iframe.contentWindow
  //
  //   g.addEventListener("wheel", function (e) {
  //     var e = g.scroll
  //     if (e>0) {
  //       d("header").style.height = `75px`
  //     }
  //     if (e==0) {
  //       d("header").style.height = `100px`
  //     }
  //   })
  // }
  return iframe
}

function insertSite() {
  d("main").innerHTML = ""
  document.title = `Sam Taen`
  if (location.hash) {
    l = location.hash.replace("#", "/")
  } else {
    l = "/"
  }
  if (location.pathname.length>1) {
    location.pathname = ""
    location.hash = location.pathname.replace("/","")
  }
  page = Pages.filter(a=>a.href==l)
  if (page.length>0) {
    // d("main").appendChild(create.Title("Found"))
    d("main").appendChild(create.Iframe(`/site${l}`))
    d("iframe").focus()
    if (qi.s) {
      var link = page[0].href.replace("/", "")
      var name = page[0].name
      if (!name) {
        name = `Sam Taen`
      }
      if (!link) {
        link = `main`
      }
      qi.s(`/log ${link} ${name}`)
    }
    if (page[0].name) {
      document.title = `Sam Taen - ${page[0].name}`
    }
    // incr(page[0].href)
  } else {
    d("main").appendChild(create.Title("404, Not Found"))
    document.title = `Sam Taen - 404`
  }
  if (d("iframe")) {
    d("iframe").addEventListener("load", resize)
  }
}
function resize() {
  if (d("iframe")) {
    d("iframe").height= innerHeight - headerHeight()
  }

  scroll(0,0)
}
insertSite()
addEventListener("resize", resize)
addEventListener("hashchange", insertSite)
