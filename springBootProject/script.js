var token = ''; // Replace with your JWT token

function getAllSchoolsFromTable(){
  axios.get('http://localhost:8090/school/all')
    .then((res) => console.log(res))
    .catch((err0 => console.log(err)))
}

// hardcoded login to retrieve the token for later use
document.getElementById('getTokenButton').addEventListener('click', function() {
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
      // Do something with the token
    })
    .catch(function(error) {
      console.error('Error retrieving token:', error);
      // Handle the error
    });
});

// creating school
document.getElementById('createSchoolForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

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


  axios.post('http://localhost:8090/school/save', school, { // address
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
});