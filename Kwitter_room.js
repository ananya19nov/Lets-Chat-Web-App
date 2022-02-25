
var firebaseConfig = {
    apiKey: "AIzaSyCR7lA9X5Zi7gZPPXJ7CXsFzRNbd4GDo6g",
    authDomain: "kwitter-d5ea0.firebaseapp.com",
    databaseURL: "https://kwitter-d5ea0-default-rtdb.firebaseio.com",
    projectId: "kwitter-d5ea0",
    storageBucket: "kwitter-d5ea0.appspot.com",
    messagingSenderId: "617185841413",
    appId: "1:617185841413:web:2298c38281247cdfe4e76c"
  };
  
  firebase.initializeApp(firebaseConfig);

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    //Start code
    Room_names = childKey;
    console.log("Room Name - " + Room_names);
    row = "<div class='room_name' id = "+Room_names+" onclick = 'redierectToRoomName(this.id)'> #" + Room_names + "</div>  <hr>"
    document.getElementById("output").innerHTML += row;
    //End code
    });});}
getData();

function redierectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name" , name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location = "index.html" ; 
}

user_name = localStorage.getItem("username");
document.getElementById("name").innerHTML = "Welcome " + user_name;

function addRoom(){
    room_name = document.getElementById("roomName").value;
    firebase.database().ref("/").child(room_name).update({
          purpose : "adding room name"
    });

    localStorage.setItem( "room_name" , room_name);

    window.location = "kwitter_page.html" ; 
}

