var firebaseConfig = {
  apiKey: "AIzaSyB_MXFNOGVZoTCtC9jyW4priQewHOHJVsc",
  authDomain: "sam-taen.firebaseapp.com",
  databaseURL: "https://sam-taen.firebaseio.com",
  projectId: "sam-taen",
  storageBucket: "sam-taen.appspot.com",
  messagingSenderId: "222598624178",
  appId: "1:222598624178:web:10cffa918521002833aaab",
  measurementId: "G-CS71BMJZ36"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()
// var functions = firebase.functions()
var pageViews = db.collection("pageviews")
var total = pageViews.doc("counts")


function incr(tabelname) {
  var name = clean(tabelname)
  var opt = {}
  opt[name] = firebase.firestore.FieldValue.increment(1)
  total.update(opt)
}
function clean(str) {
  var regex = new RegExp("/", "g")
  var name = `${str}`.replace(regex, '-')
  name = name.replace(/^-/, "")
  name = name.replace(/-$/, "")
  if (!name) {
    name = "-"
  }
  return name
}
