//YOUR FIREBASE LINKS
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
user = localStorage.getItem("username");
room = localStorage.getItem("room_name");

function getData() {
    firebase.database().ref("/" + room).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                u_name = message_data['user_name'];
                message = message_data['message'];
                like = message_data['likes'];

                name_with_tag = "<h4>" + u_name + "<img src='tick.png' class = 'user_tick'> </h4>";
                message_with_tag = "<h4 class = 'message_h4' >" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row; //End code 
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log(message_id);
    button_id = message_id;
    likes1 = document.getElementById(button_id).value;
    updated_likes = Number(likes1) + 1;
    console.log(updated_likes);
    firebase.database().ref(room).child(message_id).update({
        likes: updated_likes
    });
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}


function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room).push({
        user_name: user,
        message: msg,
        likes: 0
    });

    document.getElementById("msg").value = "";
}