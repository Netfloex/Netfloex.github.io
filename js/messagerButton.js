var b = d("messagerButton")
var w = d("messager")
b.addEventListener("click", function () {
  openMessager()
})

function openMessager() {
  w.classList.remove("hidden")
  setTimeout(function () {
    w.classList.remove("hiddenMessager")
  })
  console.log("yee");
}
