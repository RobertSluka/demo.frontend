var token = ''; // Replace with your JWT token

// Create a WebSocket connection
var stompClient = null;

var socket = new SockJS('/ws');
stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
  console.log(frame);

  stompClient.subscribe('/chat/{username|', function(result) {
    console.log("Is working")
    show(JSON.parse(result.body));
  });

  stompClient.subscribe('/user/specific', function(result) {
    console.log(result.body);
    show(JSON.parse(result.body));
  });
});

function sendMessage() {
  var text = document.getElementById('text').value;
  if (stompClient && stompClient.connected) {
    stompClient.send("/chat/john", {}, JSON.stringify({ 'text': text }));
  } else {
    console.log('Stomp client is not connected');
  }
}

function show(messages) {
  var response = document.getElementById('messages');
  var p = document.createElement('p');
  p.innerHTML = "message: " + messages.text;
  response.appendChild(p);
}

function authenticateUser() {
  var email = 'haha@hihi.com';
  var password = 'PassW0rd1';

  var loginDto = {
    email: email,
    password: password
  };

  axios.post('http://localhost:8090/user/login', loginDto)
    .then(function(response) {
      token = response.data;
      console.log('Token:', response.data);
      // Save the school after successful authentication
      saveSchool();
    })
    .catch(function(error) {
      console.error('Error authenticating user:', error);
      // Handle the authentication error
    });
}

function saveSchool() {
  var id = document.getElementById('id').value;
  var name = document.getElementById('name').value;
  var capacity = document.getElementById('capacity').value;
  var address = document.getElementById('address').value;

  var school = {
    id: id,
    name: name,
    capacity: capacity,
    address: address
  };

  axios.post('http://localhost:8090/school/save', school, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(function(response) {
    console.log('School created successfully:', response.data);
    // Do something with the response
  })
  .catch(function(error) {
    console.error('Error creating school:', error);
    // Handle the error
  });
}

// Authenticate user and save school on form submission
document.getElementById('createSchoolForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  authenticateUser();
});

// Call this function to fetch all schools from the server
function getAllSchoolsFromTable() {
  axios.get('http://localhost:8090/school/all')
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
