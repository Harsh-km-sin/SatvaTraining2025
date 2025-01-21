// Event listener for the state dropdown to populate cities based on the selected state
document.getElementById('state').addEventListener('change', function () {
    const state = this.value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="">Select City</option>';

    if (state === 'Gujarat') {
      const gujaratCities = ['Ahmedabad', 'Vadodara', 'Rajkot'];
      gujaratCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    } else if (state === 'Rajasthan') {
      const rajasthanCities = ['Ajmer', 'Jalore', 'Sirohi', 'Jaisalmer'];
      rajasthanCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });

// Validation patterns for form fields
const patterns = {
  name: /^[A-Za-z\s]{2,50}$/,
  mobile: /^(?!0000000000$)[0-9]{10}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  college: /^[A-Za-z\s&.'-]{2,100}$/,
  cgpa: /^(?:([1-9]|10)(?:\.\d+)?|0(\.\d+)?|(\.\d+))$/,
  branch: /^[A-Za-z\s&()-]{2,50}$/,
  zip: /^\d{6}$/,
};

function validateField(field) {
  const pattern = patterns[field.id];
  if (!pattern) return;

  field.classList.remove("is-valid", "is-invalid");

  if (!field.value && !field.hasAttribute("required")) return;

  if (pattern.test(field.value)) {
    field.classList.add("is-valid");
    return true;
  } else {
    field.classList.add("is-invalid");
    return false;
  }
}

function validateSelect(select) {
  if (select.value) {
    select.classList.add("is-valid");
    select.classList.remove("is-invalid");
    return true;
  } else {
    select.classList.add("is-invalid");
    select.classList.remove("is-valid");
    return false;
  }
}

function validateDateRange(startDateField, endDateField) {
  if (new Date(startDateField.value) <= new Date(endDateField.value)) {
    startDateField.classList.add("is-valid");
    startDateField.classList.remove("is-invalid");
    endDateField.classList.add("is-valid");
    endDateField.classList.remove("is-invalid");
    return true;
  } else {
    startDateField.classList.add("is-invalid");
    endDateField.classList.add("is-invalid");
    return false;
  }
}

// Save form data to local storage
function saveToLocalStorage(data) {
  const existingData = JSON.parse(localStorage.getItem("exerciseData")) || [];
  existingData.push(data);
  localStorage.setItem("exerciseData", JSON.stringify(existingData));
}

// Load data from local storage into the table
function loadFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem("exerciseData")) || [];
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = ""; // Clear the table before reloading data

  storedData.forEach((rowData, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${rowData.name}</td>
      <td>${rowData.mobile}</td>
      <td>${rowData.email}</td>
      <td>${rowData.college}</td>
      <td>${rowData.cgpa}</td>
      <td>${rowData.branch}</td>
      <td>${rowData.startDate} to ${rowData.endDate}</td>
      <td>${rowData.state}</td>
      <td>${rowData.city}</td>
      <td>${rowData.zip}</td>
      <td>
        <div class="d-flex flex-column align-items-center">
          <button class="btn btn-sm btn-warning edit-btn mb-2">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-btn">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    `;

    // Add event listener for the edit button
    const editBtn = newRow.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
      document.getElementById("name").value = rowData.name;
      document.getElementById("mobile").value = rowData.mobile;
      document.getElementById("email").value = rowData.email;
      document.getElementById("college").value = rowData.college;
      document.getElementById("cgpa").value = rowData.cgpa;
      document.getElementById("branch").value = rowData.branch;
      document.getElementById("startDate").value = rowData.startDate;
      document.getElementById("endDate").value = rowData.endDate;
      document.getElementById("state").value = rowData.state;
      document.getElementById("city").value = rowData.city;
      document.getElementById("zip").value = rowData.zip;

      document.getElementById("exerciseForm").dataset.editing = index;
    });

    // Add event listener for the delete button
    const deleteBtn = newRow.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this record?")) {
        newRow.remove();
        removeFromLocalStorage(rowData);
      }
    });

    tableBody.appendChild(newRow);
  });
}

// Remove data from local storage
function removeFromLocalStorage(rowData) {
  const storedData = JSON.parse(localStorage.getItem("exerciseData")) || [];
  const updatedData = storedData.filter(
    (data) =>
      data.name !== rowData.name ||
      data.mobile !== rowData.mobile ||
      data.email !== rowData.email
  );
  localStorage.setItem("exerciseData", JSON.stringify(updatedData));
}

// Handle form submission
document.getElementById("exerciseForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const editingIndex = document.getElementById("exerciseForm").dataset.editing;
  const formData = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    college: document.getElementById("college").value,
    cgpa: document.getElementById("cgpa").value,
    branch: document.getElementById("branch").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
    zip: document.getElementById("zip").value,
  };

  if (editingIndex !== undefined) {
    const storedData = JSON.parse(localStorage.getItem("exerciseData")) || [];
    storedData[editingIndex] = formData; // Update existing data
    localStorage.setItem("exerciseData", JSON.stringify(storedData));

    // Reload the table and form
    loadFromLocalStorage();
    document.getElementById("exerciseForm").reset();
    document.getElementById("exerciseForm").dataset.editing = "";
  } else {
    saveToLocalStorage(formData);
    loadFromLocalStorage();
    document.getElementById("exerciseForm").reset();
  }
});

// Add onblur event to validate fields
const formFields = document.querySelectorAll('#exerciseForm input[type="text"], #exerciseForm input[type="email"], #exerciseForm select');
formFields.forEach(field => {
  field.addEventListener("blur", function() {
    validateField(field);
  });
});

document.querySelector('button[type="button"].btn-danger').addEventListener('click', function() {
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tr');

  const data = [];
  
  rows.forEach((row, index) => {
      const cells = row.querySelectorAll('td, th');
      const rowData = [];

      cells.forEach(cell => {
          rowData.push(cell.innerText || cell.textContent);
      });

      if (index > 0) {
          data.push(rowData);
      }
  });

  const ws = XLSX.utils.aoa_to_sheet([['Name', 'Mobile', 'Email', 'College Name', 'CGPA', 'Branch Name', 'From to When You Studied', 'State', 'City', 'Zip', 'Action'], ...data]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Exercise Data');

  XLSX.writeFile(wb, 'exercise_data.xlsx');
});

loadFromLocalStorage();
