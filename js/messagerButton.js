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
  qi.w.classList.remove("hiddenMessager")
}
function closeMessager() {
  qi.w.classList.add("hiddenMessager")
  qi.b.classList.remove("closeIcon")
  qi.b.classList.add("appear")
}
function toggleMessager() {
  qi.w.classList.toggle("hiddenMessager")
  qi.b.classList.toggle("closeIcon")
  qi.b.classList.toggle("appear")
}

qi.i.addEventListener("load", function () {
  qi.g = qi.i.contentWindow
  qi.s = qi.g.sendMessage

})
