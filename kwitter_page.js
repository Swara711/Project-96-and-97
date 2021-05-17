user_name = localStorage.getItem("user_name");
room_name1 = localStorage.getItem("room_name");

var firebaseConfig = {
    apiKey: "AIzaSyDfhwMAq3Vcxfq7VkURr9_jH_CQ2l2zKMs",
    authDomain: "kwitter-3fec2.firebaseapp.com",
    databaseURL: "https://kwitter-3fec2-default-rtdb.firebaseio.com",
    projectId: "kwitter-3fec2",
    storageBucket: "kwitter-3fec2.appspot.com",
    messagingSenderId: "794742743870",
    appId: "1:794742743870:web:7103c37edbe82eaed9c26f"
  };
  firebase.initializeApp(firebaseConfig);

function getData() { 
firebase.database().ref("/"+room_name1).on('value', function(snapshot) { 
document.getElementById("output").innerHTML = ""; 
snapshot.forEach(function(childSnapshot) { 
childKey  = childSnapshot.key; 
childData = childSnapshot.val(); 
if(childKey != "purpose") {
firebase_message_id = childKey;
message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>"+name+"<img class='user_tick' src ='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>"+message+"</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class= 'glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
row = name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;

 } });  }); }
getData();


function send(){
message = document.getElementById("message").value;
firebase.database().ref(room_name1).push({
    name: user_name, 
    message: message,
    like: 0
});
document.getElementById("message").value = "";

}
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
function updateLike(message_id){
console.log("clicked on like button - "+ message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_likes = Number(likes)+1;
console.log(updated_likes);
firebase.database().ref(room_name1).child(message_id).update({
    like: updated_likes
});

}