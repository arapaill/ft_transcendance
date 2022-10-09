const socket = io('http://localhost:9876');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const log42 = document.getElementById('email');
var sendMessageBtn = document.getElementById("send_message_btn");
var createRoomBtn = document.getElementById("room_add_icon_holder");
var roomInput = document.getElementById("roomInput");
var roomlist = document.getElementById("active_rooms_list");
var currentRoom = "global";
var roomsb = [
  // { name: "global", creator: "Anonymous" },
];
var arrayofb = {
  global: [],
  typescript: [],
  nestjs: [],
  tessto: [],
  fahd: [],
};
var special = false;
var activeroom = 'global';
var userlist = document.getElementById("active_users_list");
const messages = [];
function getMessages() {
  fetch('http://localhost:9876/api/chat').then((response) => response.json()).then((data) => {

  let filtered_arr = data.filter((obj)=> obj.roomsb === activeroom);
  // data = filtered_arr;
  // alert(JSON.stringify(filt, null, 4));
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

function myFunction() {
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("text");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
     text.style.display = "none";
  }
};
const ee = document.getElementById('roomio');

ee.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    alert(ee.value);
  }
});

msgBox.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    email = username;
    firstName = username;
    // rooms = 'fff';
    // alert(msgBox.value);
    sendMessage({ email: username, text: msgBox.value, firstName , roomsb :activeroom});
    // e.target.value = '';
  }
});

createRoomBtn.addEventListener("click", function () {
  let roomName = roomInput.value.trim();
  if (roomName !== "") {
    socket.emit("createRoom", roomName);
    roomInput.value = "";
  }
});

roomInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    rooms = e.target.value;
  let roomName = rooms.trim();
  if (roomName !== "") {
    alert(e.target.value);
    socket.emit("createRoom", rooms);
    roomInput.value = "";
  }
}
});

socket.on("updateUsers", function (usernames) {
  userlist.innerHTML = "";
  // console.log("usernames returned from server", usernames);
  for (var user in usernames) {
    userlist.innerHTML += `<div class="user_card">
                              <div class="pic"></div>
                              <span>${user}</span>
                            </div>`;
  }
});

// msgos.addEventListener('keydown', (e) => {
//   if (e.keyCode === 13) {
//     alert( e.target.value);
//   }
// }
// );

function enableCreateUser() {
    var status = document.getElementById("is_user").checked;
    document.getElementById("user_register").hidden = status;
  }

socket.on("createRoom", function (roomName ) {
  if (rooms != null) {
    roomsb.push(roomName);

    io.sockets.emit("updateRooms", roomsb, null);
  }
});

socket.on("connect", function () {
  username = prompt("Enter name: ");
  socket.emit("createUser", { sender: username, room: currentRoom, message: "string" });
  getMessages();
});

socket.on("updateRooms", function (rooms, newRoom) {
  alert("jani updateRooms");
  roomlist.innerHTML = "";
  alert(JSON.stringify(rooms, null, 4));
  for (var index in rooms) {
    roomlist.innerHTML += `<div class="room_card" id="${rooms[index].name}">
                                <div class="roomInfo"> ${rooms[index].creator}
                                    <div class="pic"></div>
                                    <div class="roomInfo">
                                    <button id="bgnBtn" onclick="promptMe()">${rooms[index].name}</button>
                                    <div class="roomInfo">
                                    </div>
                                </div>
                            </div>`;
  }
  document.getElementById(currentRoom).classList.add("active_item");
});

socket.on('recMessage', (message) => {
  messages.push(message);
  // alert(currentRoom);
  // alert(activeroom);
  // alert(room);
  // // console.log(activeroom);
  // arrayofb[activeroom].push(message);
  // alert(activeroom);
  // alert(JSON.stringify(messages, null, 4));
  // console.log(messages);
  loadDate(messages);
  // loadDate(arrayofb[activeroom]);
});

function promptMe(){
  email = prompt("Please provide an Adjective");
  amplify.store("mypas", userAdjective);
};

function loadDate(data) {
  let messages = '';
  let felterit = data.filter((obj)=> obj.roomsb === activeroom);
  felterit.map((message) => {
  { 
    messages += `<div class="message_holder  ${username === message.email ? "me" : ""}">
    <div class="pic"></div>
    <div class="message_box">
      <div id="message" class="message">
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
}
function changeRoom(rooms) {
  if (rooms != currentRoom) {
    // alert(rooms);
    passw = prompt("Password: ");
    if(passw != "test")
      return;
    activeroom = rooms;
    socket.emit("updateRooms", rooms);
    // socket.emit("sendMessage", { email: username, text: "you changed the room to " + activeroom  , roomsb :activeroom});
    getMessages();
    document.getElementById(currentRoom).classList.remove("active_item");
    currentRoom = rooms;
    document.getElementById(currentRoom).classList.add("active_item");
  }
  activeroom = rooms;
}
