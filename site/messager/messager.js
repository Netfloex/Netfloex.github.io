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
    if (doc.id=="cleared") {
      q = new Date(d.time.seconds * 1000)
      createHTMLmessage(`Gewist: ${timeSpent(q)} geleden.`, `BROADCAST`, q)
    }
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
var lastSend = new Date()

function typeBalk(e) {
  if (e.key=="Enter") {
    var v = this.value
    if (v.length<1) {
      return
    }
    if (new Date()-lastSend<1000) {
      return
    }
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
  if (msg.length<1) {
    return
  }
  lastSend = new Date()
  Messages.add({
    msg: msg,
    user: id,
    date: firebase.firestore.Timestamp.fromDate(new Date())
  })
}
function createHTMLmessage(msg, user, date) {
  if (msg) {
    msg = htmlEncode(msg)
    var opacity = 1
    var copyMsg = msg
    if (msg.startsWith(prefix)) {
      var args = msg.slice(prefix.length).trim().split(/ +/g);
      var command = args.shift().toLowerCase();
      msg = args.join(" ")
      if (command == "script"&&false) {
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
        msg = `<h1 class="display-3">${args.join(" ")}</h1>`
      } else if (command == "log") {
        if (args[0]=="main") {
          args[0] = ""
        }
        msg = `Traveled to <a href="/#${args.shift()}" target="_top">${args.join(" ")}</a>`
        opacity = .5
      }  else {
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
    if (user !== "BROADCAST") {
      msgBox.appendChild(time)
    } else {
      msgBox.classList.add("broadcast")
      html.align = "center"
    }
    if (user == id) {
      html.classList.add("msg-you")
      html.align = "right"
    } else {
    }
    msgBox.style.backgroundColor = `hsla(${user%360}, 50%, 50%, ${opacity})`
    msgBox.style.color = `rgba(255, 255, 255, ${opacity})`
    if (command == "script"&&false) {
      msgBox.style.backgroundColor = "black"
    }
    if (user=="Sam") {
      msgBox.style.backgroundImage=   `linear-gradient(135deg, #009688, #2bbbad)`
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
    Messages.doc("cleared").set({
      time: firebase.firestore.Timestamp.fromDate(new Date()),
      user: id
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
