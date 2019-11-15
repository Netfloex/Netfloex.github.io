var qi = {}
qi.b = d("messagerButton")
qi.c = d("closeButton")
qi.w = d("messager")
qi.i = d("messagerIframe")

qi.b.addEventListener("click", function () {
  toggleMessager()
})
qi.c.addEventListener("click", function () {
  closeMessager()
})
function openMessager() {
  // qi.w.classList.remove("hidden")
  setTimeout(function () {
    qi.w.classList.remove("hiddenMessager")
    qi.b.classList.add("closeIcon")
    qi.b.classList.remove("appear")
  })
  var src = new URL(qi.i.src)
  if (src.pathname.length<2) {
    qi.i.src = "/site/messager"
  }
}
function closeMessager() {
  qi.w.classList.add("hiddenMessager")
  qi.b.classList.remove("closeIcon")
  qi.b.classList.add("appear")
  setTimeout(function () {
    // qi.w.classList.add("hidden")
  },400)
}
function toggleMessager() {
  if (qi.w.classList.contains("hiddenMessager")) {
    openMessager()
  } else {
    closeMessager()
  }
}

qi.i.addEventListener("load", function () {
  qi.g = qi.i.contentWindow
  qi.s = qi.g.sendMessage

})
