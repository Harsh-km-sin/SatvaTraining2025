document.getElementById("state").addEventListener("change", function () {
    const state = this.value;
    const citySelect = document.getElementById("city");
    citySelect.innerHTML = '<option value="">Select City</option>';
  
    if (state === "Gujarat") {
      const gujaratCities = ["Ahmedabad", "Vadodara", "Rajkot"];
      gujaratCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    } else if (state === "Rajasthan") {
      const rajasthanCities = ["Ajmer", "Jalore", "Sirohi", "Jaisalmer"];
      rajasthanCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });
  
  const imageUpload = document.getElementById("imageUpload");
  let imageCount = 0;
  
  imageUpload.addEventListener("change", (event) => {
    const files = event.target.files;
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const imageUrl = e.target.result;
  
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");
          if (imageCount === 0) {
            carouselItem.classList.add("active");
          }
  
          const img = document.createElement("img");
          img.src = imageUrl;
          img.classList.add("d-block", "w-100", "custom-height");
          img.alt = `Slide ${imageCount + 1}`;
          carouselItem.appendChild(img);
  
          document.getElementById("carouselItems").appendChild(carouselItem);
  
          const indicator = document.createElement("button");
          indicator.type = "button";
          indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
          indicator.setAttribute("data-bs-slide-to", imageCount);
          indicator.setAttribute("aria-label", `Slide ${imageCount + 1}`);
          if (imageCount === 0) {
            indicator.classList.add("active");
          }
          document.getElementById("carouselIndicators").appendChild(indicator);
  
          imageCount++;
        };
  
        reader.readAsDataURL(file);
      }
    }
  
    imageUpload.value = "";
  
    if (imageCount > 0) {
      const carousel = new bootstrap.Carousel(
        document.getElementById("carouselExampleIndicators"),
        {
          interval: 2000,
          ride: "carousel",
        }
      );
      carousel.cycle();
    }
  });
  
  function validateForm() {
    let isValid = true;
  
    const name = document.getElementById("name");
    if (name.value.length < 2) {
      isValid = false;
      document.getElementById("nameError").textContent =
        "Name must be at least 2 characters";
    } else {
      document.getElementById("nameError").textContent = "";
    }
  
    const mobile = document.getElementById("mobile");
    if (mobile.value.length !== 10 || isNaN(mobile.value)) {
      isValid = false;
      document.getElementById("mobileError").textContent =
        "Mobile must be 10 digits";
    } else {
      document.getElementById("mobileError").textContent = "";
    }
  
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      isValid = false;
      document.getElementById("emailError").textContent = "Invalid Email";
    } else {
      document.getElementById("emailError").textContent = "";
    }
  
    const college = document.getElementById("college");
    if (college.value === "") {
      isValid = false;
      document.getElementById("collegeError").textContent =
        "College Name is required";
    } else {
      document.getElementById("collegeError").textContent = "";
    }
  
    const cgpa = document.getElementById("cgpa");
    if (
      isNaN(cgpa.value) ||
      cgpa.value < 0 ||
      cgpa.value > 10 ||
      cgpa.value === ""
    ) {
      isValid = false;
      document.getElementById("cgpaError").textContent =
        "Enter a valid CGPA (0 to 10)";
    } else {
      document.getElementById("cgpaError").textContent = "";
    }
  
    const branch = document.getElementById("branch");
    if (branch.value === "") {
      isValid = false;
      document.getElementById("branchError").textContent =
        "Branch Name is required";
    } else {
      document.getElementById("branchError").textContent = "";
    }
  
    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");
    if (fromDate.value === "" || toDate.value === "") {
      isValid = false;
      document.getElementById("dateError").textContent =
        "Please select valid dates";
    } else {
      document.getElementById("dateError").textContent = "";
    }
  
    const state = document.getElementById("state");
    const city = document.getElementById("city");
    if (state.value === "" || city.value === "") {
      isValid = false;
      document.getElementById("stateError").textContent =
        "State and City are required";
      document.getElementById("cityError").textContent =
        "Select a valid city for the selected state";
    } else {
      document.getElementById("stateError").textContent = "";
      document.getElementById("cityError").textContent = "";
    }
  
    const zip = document.getElementById("zip");
    if (zip.value.length !== 6 || isNaN(zip.value)) {
      isValid = false;
      document.getElementById("zipError").textContent =
        "Zip code must be 6 digits";
    } else {
      document.getElementById("zipError").textContent = "";
    }
  
    return isValid;
  }
  
  function addRowToTable(rowData, rowIndex) {
    const tableBody = document.getElementById("tableBody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
                  <td>${rowData.name}</td>
                  <td>${rowData.mobile}</td>
                  <td>${rowData.email}</td>
                  <td>${rowData.college}</td>
                  <td>${rowData.cgpa}</td>
                  <td>${rowData.branch}</td>
                  <td>${rowData.fromDate} - ${rowData.toDate}</td>
                  <td>${rowData.state}</td>
                  <td>${rowData.city}</td>
                  <td>${rowData.zip}</td>
                  <td>
                      <button type="button" class="btn btn-warning edit-button w-100 mb-1">Edit</button>
                      <button type="button" class="btn btn-danger delete-button w-100">Delete</button>
                  </td>
              `;
    tableBody.appendChild(newRow);
  
    newRow.querySelector(".edit-button").addEventListener("click", function () {
      document.getElementById("name").value = rowData.name;
      document.getElementById("mobile").value = rowData.mobile;
      document.getElementById("email").value = rowData.email;
      document.getElementById("college").value = rowData.college;
      document.getElementById("cgpa").value = rowData.cgpa;
      document.getElementById("branch").value = rowData.branch;
      document.getElementById("fromDate").value = rowData.fromDate;
      document.getElementById("toDate").value = rowData.toDate;
      document.getElementById("state").value = rowData.state;
      document.getElementById("city").value = rowData.city;
      document.getElementById("zip").value = rowData.zip;
  
      document
        .getElementById("addRowButton")
        .setAttribute("data-edit-index", rowIndex);
    });
  
    newRow.querySelector(".delete-button").addEventListener("click", function () {
      newRow.remove();
  
      let storedData = JSON.parse(localStorage.getItem("formData"));
      storedData.splice(rowIndex, 1);
      localStorage.setItem("formData", JSON.stringify(storedData));
    });
  }
  
  document.getElementById("addRowButton").addEventListener("click", function () {
    if (validateForm()) {
      const rowData = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        college: document.getElementById("college").value,
        cgpa: document.getElementById("cgpa").value,
        branch: document.getElementById("branch").value,
        fromDate: document.getElementById("fromDate").value,
        toDate: document.getElementById("toDate").value,
        state: document.getElementById("state").value,
        city: document.getElementById("city").value,
        zip: document.getElementById("zip").value,
      };
  
      const editIndex = this.getAttribute("data-edit-index");
      if (editIndex !== null) {
        const tableBody = document.getElementById("tableBody");
        const rowToUpdate = tableBody.children[editIndex];
        rowToUpdate.children[0].textContent = rowData.name;
        rowToUpdate.children[1].textContent = rowData.mobile;
        rowToUpdate.children[2].textContent = rowData.email;
        rowToUpdate.children[3].textContent = rowData.college;
        rowToUpdate.children[4].textContent = rowData.cgpa;
        rowToUpdate.children[5].textContent = rowData.branch;
        rowToUpdate.children[6].textContent = `${rowData.fromDate} - ${rowData.toDate}`;
        rowToUpdate.children[7].textContent = rowData.state;
        rowToUpdate.children[8].textContent = rowData.city;
        rowToUpdate.children[9].textContent = rowData.zip;
  
        let storedData = JSON.parse(localStorage.getItem("formData"));
        storedData[editIndex] = rowData;
        localStorage.setItem("formData", JSON.stringify(storedData));
  
        this.removeAttribute("data-edit-index");
      } else {
        addRowToTable(
          rowData,
          document.getElementById("tableBody").children.length
        );
  
        let storedData = JSON.parse(localStorage.getItem("formData")) || [];
        storedData.push(rowData);
        localStorage.setItem("formData", JSON.stringify(storedData));
      }
  
      document.getElementById("exerciseForm").reset();
      document.getElementById("nameError").textContent = "";
      document.getElementById("mobileError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("collegeError").textContent = "";
      document.getElementById("cgpaError").textContent = "";
      document.getElementById("branchError").textContent = "";
      document.getElementById("dateError").textContent = "";
      document.getElementById("stateError").textContent = "";
      document.getElementById("cityError").textContent = "";
      document.getElementById("zipError").textContent = "";
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      savedData.forEach((row, index) => {
        addRowToTable(row, index);
      });
    }
  });
  