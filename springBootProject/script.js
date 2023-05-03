//Get
function getAllSchoolsFromTable(){
   axios.get('http://localhost:8090/school/all')
     .then((res) => console.log(res))
     .catch((err0 => console.log(err)))
 }
 
 //Post
 class School {
   constructor(schoolId, address, capacity, name) {
     this.schoolId = schoolId;
     this.address = address;
     this.capacity = capacity;
     this.name = name;
   }
 }
 
 function handleSubmit(event) {
   event.preventDefault();
   const formData = new FormData(event.target);
   const school = new School(
     formData.get('schoolId'),
     formData.get('address'),
     formData.get('capacity'),
     formData.get('name')
   );
   axios.post('http://localhost:8090/school/save', school)
     .then(response => {
       console.log(response.data);
     })
     .catch(error => {
       console.log(error);
     });
 }
 
 function App() {
   return (
     <form onSubmit={handleSubmit} id="myform">
       <div>
         <label htmlFor="schoolId">schoolId</label>
         <input type="number" name="schoolId" id="schoolId" />
       </div>
       <div>
         <label htmlFor="name">Name</label>
         <input type="text" name="name" id="name" />
       </div>
       <div>
         <label htmlFor="address">Address</label>
         <input type="text" name="address" id="address" />
       </div>
       <div>
         <label htmlFor="capacity">Capacity</label>
         <input type="number" name="capacity" id="capacity" />
       </div>
       <button type="submit">Submit</button>
     </form>
   );
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));