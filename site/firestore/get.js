


total.get().then((totel) => {
  var counts = totel.data()
  console.log(counts);
  var keys = Object.keys(counts)
  var spans = []
  keys.forEach(k=> {
    spans.push(`${k} = ${counts[k]}`)
  })
  document.body.innerHTML = spans.join("<br>")
  incr(location.pathname)
});
