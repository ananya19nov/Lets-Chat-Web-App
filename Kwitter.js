function Adduser(){
    input = document.getElementById("login_input").value;

    localStorage.setItem("username" , input);

    window.location = "Kwitter_room.html" ; 
}