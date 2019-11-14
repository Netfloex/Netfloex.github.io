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
create.fourOfour = function () {
  var o44 = d("fourOfour")
  o44.classList.remove("hidden")
  var src = new URL(d("iframe").src)
  if (src.pathname.length>1) {
    var gb = d("goback")
    gb.classList.remove("hidden")
    gb.href = current.href.replace("/","#")
  }
}
create.Iframe = function (link) {
  var iframe = d("iframe")
  var lc = location
  var src = lc.protocol + "//" + lc.host  + link
  if (iframe.src!==src) {
    iframe.src = lc.protocol + "//" + lc.host  + link
  }
  iframe.className = "iframe"
  iframe.id = "iframe"
  iframe.height = innerHeight - headerHeight()
}

function insertSite() {
  // d("main").innerHTML = ""
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
    current = page[0]
    // d("main").appendChild(create.Title("Found"))
    d("main").classList.add("headerGradient")
    d("loading").classList.remove("hidden")
    d("iframe").classList.add("hidden")
    create.Iframe(`/site${l}`)
    d("fourOfour").classList.add("hidden")

    d("iframe").focus()
    if (qi.s) {
      var link = current.href.replace("/", "")
      var name = current.name
      if (!name) {
        name = `Sam Taen`
      }
      if (!link) {
        link = `main`
      }
      qi.s(`/log ${link} ${name}`)
    }
    if (current.name) {
      document.title = `Sam Taen - ${current.name}`
    }
    // incr(page[0].href)
  } else {
    create.fourOfour()
    d("iframe").className="hidden"
    document.title = `Sam Taen - 404`
  }
  if (d("iframe")) {
    d("iframe").addEventListener("load", resize)
  }
}
function resize() {
  if (d("iframe")) {
    d("iframe").height= innerHeight - headerHeight()
    d("loading").classList.add("hidden")
    d("iframe").classList.remove("hidden")
  }

  scroll(0,0)
}
insertSite()
addEventListener("resize", resize)
addEventListener("hashchange", insertSite)
