var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (user, message) {
    console.log(user + " - " + message);
    message = user + " : " + message;
    var li = document.createElement("li");
    li.textContent = message;
    document.getElementById("messagesList").appendChild(li);

});

connection.start().then(function () {
    console.log("connection started! yeah!");
}).catch(function (err) {
    return console.error(err.toString());
    });

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
});