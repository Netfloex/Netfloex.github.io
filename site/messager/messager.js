var c = document.createElement.bind(document)
d("#sendbalk").addEventListener("keyup", typeBalk)

var id = random(0,1000)

var ls = localStorage

if (ls.getItem("uid")) {
  id = ls.getItem("uid")
} else {
  ls.setItem("uid", id)
}

var messages = []

var Messages = db.collection("messages")

Messages.onSnapshot(updateMessages)

function updateMessages(c) {
  messages = []
  d("#messages").innerHTML = ""
  c.docs.forEach(doc => {
    var d = doc.data()
    // Messages.doc(doc.id).delete()
    if (!d.msg||!d.user||!d.date) {
      return
    }
    messages.push(d)
  })
  messages.sort(compareValues("date"))
  messages.forEach(d=>{
    createHTMLmessage(d.msg, d.user, new Date(d.date.seconds*1000))
  })

}

var prefix = "/"

function typeBalk(e) {
  if (e.key=="Enter") {
    var v = this.value
    this.value = ""
    // createHTMLmessage(v, "You")
    sendMessage(v)
  }
}
function sendMessage(msg) {
  if (msg=="/clear") {
    deleteAllMessages()
    return
  }
  Messages.add({
    msg: msg,
    user: id,
    date: firebase.firestore.Timestamp.fromDate(new Date())
  })
}
function createHTMLmessage(msg, user, date) {
  if (msg) {
    msg = htmlEncode(msg)
    var copyMsg = msg
    if (msg.startsWith(prefix)) {
      var args = msg.slice(prefix.length).trim().split(/ +/g);
      var command = args.shift().toLowerCase();
      msg = args.join(" ")
      if (command == "script") {
        if (args[0] == "hidden") {
          args.shift()
          msg = args.join(" ")
          var hidden = true
        }
        try {
          eval(msg)
        } catch (e) {
          console.error("Gebruiker heeft een error gemaakt: \n", e);
        }
      }
      else if (command == "big") {
        msg = `<h1 class="display=3">${msg}</h1>`
      } else {
        msg = copyMsg
      }
      if (hidden) {
        return
      }
    }
    var html = c("div")
    var msgBox = c("div")
    msgBox.innerHTML = msg
    msgBox.classList.add("msg")
    html.classList.add("msgd")
    html.title = user
    var time = c("span")
    // var date = new Date()
    time.innerHTML = zero(date.getHours()) + ":" + zero(date.getMinutes())
    time.classList.add("msgTime")
    html.appendChild(msgBox)
    msgBox.appendChild(time)
    if (user == id) {
      html.classList.add("msg-you")
      html.align = "right"
    } else {
    }
    msgBox.style.backgroundColor = `hsl(${user%360}, 50%, 50%)`
    if (command == "script") {
      msgBox.style.color = "white"
      msgBox.style.backgroundColor = "black"
    }
    d("#messages").appendChild(html)
    d("#messages").scroll(0,1000000)
  }
}

function deleteAllMessages() {
  Messages.get().then(d=>{
    d.docs.forEach(d=>{
      Messages.doc(d.id).delete()
    })
  })
}
function htmlEncode(value){
  // return value
  return $('<div/>').text(value).html();
}
// Adapted from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) ||
       !b.hasOwnProperty(key)) {
  	  return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ?
      (comparison * -1) : comparison
    );
  };
}
