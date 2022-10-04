const socket = io('http://localhost:9876');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const log42 = document.getElementById('email');
var sendMessageBtn = document.getElementById("send_message_btn");
const ee = document.getElementById('roomio');
const blockuser = document.getElementById('blockuser');
const ban = document.getElementById('kickusername');
const changemdp = document.getElementById('changemdp');
const changeadmin = document.getElementById('changeadmin');
var createRoomBtn = document.getElementById("room_add_icon_holder");
var roomInput = document.getElementById("roomInput");
var roomlist = document.getElementById("active_rooms_list");
var currentRoom = "global";
var bannedusers = [
  { group: "global", user: "Anonymous"},
];
var special = false;
var activeroom = 'global';
var userlist = document.getElementById("active_users_list");
var BannedbyUser = [
  {User: "global", Banned_User: "Anonymous"},
];
const messages = [];

function getMessages() {
  fetch('http://localhost:9876/api/chat').then((response) => response.json()).then((data) => {

  let filtered_arr = data.filter((obj)=> obj.roomsb === activeroom);
  // alert(JSON.stringify(filt, null, 4));
  loadDate(data); 
//  alert("****************9999999******");

  data.forEach((el) => {
      messages.push(el);
      });
    })
    .catch((err) => console.error(err));
}

function getPrivateMessages() {
  fetch('http://localhost:9876/api/chat').then((response) => response.json()).then((data) => {

  // let filtered_arr = data.filter((obj)=> obj.roomsb === activeroom);
  // let fewd = data.filter((obj)=> obj.email === activeroom);
  console.log(data);
  // alert("**********************");
  // alert(JSON.stringify(data, null, 4));
  loadDate(data); 
  data.forEach((el) => {
      messages.push(el);
      });
    })
    .catch((err) => console.error(err));
}

document.getElementById('send_message_btn').onclick = function() {
  firstName = username;
  sendMessage({ email: username, text: msgBox.value, firstName , roomsb :activeroom});
};

msgBox.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    email = username;
    firstName = username;
    sendMessage({ email: username, text: msgBox.value, firstName , roomsb :activeroom});
    msgBox.value = '';
  }
});

createRoomBtn.addEventListener("click", function () {
  let roomName = roomInput.value.trim();
  if (roomName !== "") {
    socket.emit("createRoom",  {room :roomName , mdp :ee.value});
    roomInput.value = "";
  }
});

roomInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    rooms = e.target.value;
  let roomName = rooms.trim();
  if (roomName !== "") {
    socket.emit("createRoom", {room :rooms , mdp :ee.value});
    roomInput.value = "";
  }
}
});

function myFunction() {
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("text");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
     text.style.display = "none";
  }
};

socket.on("showOwnerTools", function() {
  document.getElementById("kick").style.display="block";
  document.getElementById("chngmdp").style.display="block";
  document.getElementById("chngadmin").style.display="block";
});
// normal users cannot see these elements
socket.on("hideOwnerTools", function() {
  // alert("ana dkhelt");
  document.getElementById("kick").style.display="none";
  document.getElementById("chngmdp").style.display="none";
  document.getElementById("chngadmin").style.display="none";
});

ee.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    alert(ee.value);
  }
});

blockuser.addEventListener('keydown', (e) => {
  // e.target.value = "";
  if (e.keyCode === 13)
  {
    alert(e.target.value);
    socket.emit("BannedbyUser", e.target.value);
  }
});

ban.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    // alert("ana fe keydown");
  socket.emit("banuser", ban.value);
}
});

changemdp.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
  //   for (var index in bannedusers) {
  //     if(bannedusers[index].mdp == changemdp.value)
  //     {
      // alert(JSON.stringify(rooms, null, 4));
      alert("still in progress");
      alert(changemdp.value);
  //       bannedusers[index].mdp = changemdp.value;
  //         // return;
  //     }
  // }
}});

changeadmin.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    alert("still in progress");
    alert(changeadmin.value);
  }
});

function enableCreateUser() {
    var status = document.getElementById("is_user").checked;
    document.getElementById("user_register").hidden = status;
  }

socket.on("createRoom", function (roomName , mdp) {
  if (rooms != null) {
    roomsb.push(roomName);
    io.sockets.emit("updateRooms", roomsb, null);
  }
});

socket.on("connect", function () {
  username = prompt("Enter name: ");
  socket.emit("createUser", { sender: username, room: currentRoom, message: "string" });
  socket.emit("sendMessage", { email: "", text: "" , roomsb :""});
  document.getElementById("kick").style.display="none";
  document.getElementById("chngmdp").style.display="none";
  document.getElementById("chngadmin").style.display="none";
});

socket.on("updateUsers", function (usernames) {
  userlist.innerHTML = "";
  // alert(JSON.stringify(BannedbyUser, null, 4));
  for (var user in usernames) {
  var result = user.localeCompare(username);
  var spec;
  if (result === -1)
    spec = user + username;
  else if (result === 1)
    spec = username + user;
  else
    spec = user + username;
    userlist.innerHTML +=  `<div class="room_card" id="${user}**"
                        onclick="changeuser('${spec}', '${user}**')">
                      <div class="room_item_content">
                          <button id="bgnBtn">${user}</button>
                          </div>
                   </div>
           </div>`;
  }
  // document.getElementById(currentRoom).classList.add("active_item");
});

socket.on('updateUsersBannedUser', (banned) => {
  BannedbyUser =  banned;
 });
 

function changeuser(rooms, user ) {
  if(rooms == currentRoom)
    socket.emit("SendPrivateMessageexp", { email: "", text: "" + "" , roomsb : rooms});
  if (rooms != currentRoom) {
    activeroom = rooms;
    alert("test is"+user);
    let getbannedusers = BannedbyUser.filter((obj)=> obj.User == username);
    alert("test is");
    alert(JSON.stringify(getbannedusers, null, 4));
    for (var index in getbannedusers) {
        if(getbannedusers[index].Banned_User == user.replace('**',''))
        {
            alert("The User did block you ");
            return;
        }
    }
    socket.emit("updateRooms", rooms);
    socket.emit("SendPrivateMessageexp", { email: "", text: "" + "" , roomsb : rooms});
    document.getElementById(currentRoom).classList.remove("active_item");
    currentRoom = user;
    document.getElementById(user).classList.add("active_item");
  }
  activeroom = rooms;
  // alert("currentRoom is " + currentRoom);
}

socket.on("updateRooms", function (rooms, newRoom) {  
  roomlist.innerHTML = "";
  for (var index in rooms) {
    roomlist.innerHTML += `<div class="room_card" id="${rooms[index].name}"
                                onclick="changeRoom('${rooms[index].name}', '${rooms[index].mdp}')">
                                <div class="room_item_content">
                                    <button id="bgnBtn">${rooms[index].name}</button>
                                    </div>
                                </div>
                            </div>`;
  }
  document.getElementById(currentRoom).classList.add("active_item");
});

socket.on('recMessage', (message) => {  
 messages.push(message);
  // arrayofb[activeroom].push(message);
  // alert(JSON.stringify(messages, null, 4));
  getMessages();
  loadDate(messages);
});

socket.on('RecPrivateMessage', (message) => {  
  messages.push(message);
   getPrivateMessages();
   loadPrivateDate(messages);
 });

function promptMe(){
  email = prompt("Please provide an Adjective");
  amplify.store("mypas", userAdjective);
};

function loadPrivateDate(data) {
  let messages = '';
  let felterit = data.filter((obj)=> obj.roomsb === activeroom);
  // alert(JSON.stringify(felterit, null, 4));
  // let felter_private = felterit.filter((obj)=> obj.email === activeroom);
  felterit.map((message) => {
  { 
    messages += `<div class="message_holder  ${username === message.email ? "me" : ""}">
    <div class="pic"></div>
    <div class="message_box">
      <div id="message" class="message">
      <div class="circular--portrait"> <img src="https://cdn.intra.42.fr/users/${message.email}.png" /> </div>
        <span class="message_name">${message.email}</span>
        <span class="message_text">${message.text}</span>
        </div>
        </div>
      </div>`;
  }
  });
  msgCont.innerHTML = messages;
  msgCont.scrollTop = msgCont.scrollHeight;
}

function loadDate(data) {
  let messages = '';
  let felterit = data.filter((obj)=> obj.roomsb === activeroom);
  felterit.map((message) => {
  { 
    messages += `<div class="message_holder  ${username === message.email ? "me" : ""}">
    <div class="pic"></div>
    <div class="message_box">
      <div id="message" class="message">
      <div class="circular--portrait"> <img src="https://cdn.intra.42.fr/users/${message.email}.png" /> </div>
        <span class="message_name">${message.email}</span>
        <span class="message_text">${message.text}</span>
        </div>
        </div>
      </div>`;
  }
  });
  msgCont.innerHTML = messages;
  msgCont.scrollTop = msgCont.scrollHeight;
}

function promptMe(){
  var userAdjective = prompt("Please provide an Adjective");
};

//socket.io
function sendMessage(message) {
  socket.emit('sendMessage', message);
  // getMessages();
}
function changeRoom(rooms, passwords) {
  if (rooms != currentRoom) {
    let filtered = bannedusers.filter((obj)=> obj.group === rooms).map(a => a.user);
    for(const value of filtered)
    {
      if(value == username)
      {
        alert("You Are Banned From The Following room : " + rooms);
        return;
      }
    }
    // alert("code howa :*" + passwords + "*");
    if(passwords != "")
    {
      pass = prompt("Enter password: ");
      if(passwords != pass)
        return;
    }
    activeroom = rooms;
    socket.emit("updateRooms", rooms);
    socket.emit("sendMessage", { email: "", text: "" , roomsb :""});
    document.getElementById(currentRoom).classList.remove("active_item");
    currentRoom = rooms;
    document.getElementById(currentRoom).classList.add("active_item");
  }
  activeroom = rooms;
}

socket.on('BannedUser', (bannedusernames) => {
  bannedusers = bannedusernames;
    // alert(JSON.stringify(bannedusers, null, 4));
 });
 