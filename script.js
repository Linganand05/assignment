document.addEventListener('DOMContentLoaded', loadRecords);
document.getElementById('studentForm').addEventListener('submit', addRecord);

function loadRecords() {
  const studentRecords = JSON.parse(localStorage.getItem('students')) || [];
  const tableBody = document.getElementById('studentList');
  tableBody.innerHTML = '';
  
  studentRecords.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentID}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editRecord(${index})">Edit</button>
        <button class="delete" onclick="deleteRecord(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function addRecord(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const studentID = document.getElementById('studentID').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;

  if (!name || !studentID || !email || !contact || isNaN(studentID) || isNaN(contact)) {
    alert("Please fill all fields correctly.");
    return;
  }
  
  const student = { name, studentID, email, contact };
  const studentRecords = JSON.parse(localStorage.getItem('students')) || [];
  studentRecords.push(student);
  localStorage.setItem('students', JSON.stringify(studentRecords));

  loadRecords(); // Refresh the displayed records
  document.getElementById('studentForm').reset(); // Clear the form
}

function editRecord(index) {
  const studentRecords = JSON.parse(localStorage.getItem('students'));
  const student = studentRecords[index];

  document.getElementById('name').value = student.name;
  document.getElementById('studentID').value = student.studentID;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;

  // Remove the student from storage and reload after edit
  studentRecords.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(studentRecords));
}

function deleteRecord(index) {
  const studentRecords = JSON.parse(localStorage.getItem('students'));
  studentRecords.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(studentRecords));
  loadRecords(); // Refresh the displayed records
}


// Event listener for form submission
document.getElementById('studentForm').addEventListener('submit', addRecord);

/**
 * Function to add a new student record
 */
function addRecord(event) {
  event.preventDefault();

  // Get form field values
  const name = document.getElementById('name').value;
  const studentID = document.getElementById('studentID').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;

  // Input validation
  if (!name || !studentID || !email || !contact || isNaN(studentID) || isNaN(contact)) {
    alert("Please fill all fields correctly.");
    return;
  }
  
  const student = { name, studentID, email, contact };

  // Save student data in LocalStorage
  const studentRecords = JSON.parse(localStorage.getItem('students')) || [];
  studentRecords.push(student);
  localStorage.setItem('students', JSON.stringify(studentRecords));

  loadRecords(); // Refresh the displayed records
  document.getElementById('studentForm').reset(); // Clear form
} 

