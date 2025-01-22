let storageMode = 'local'; 
function setStorageMode(mode) {
    storageMode = mode;
    alert(`Storage mode set to ${mode}`);
    loadRecords();
}

function getStorageData() {
    if (storageMode === 'local') {
        return JSON.parse(localStorage.getItem('records')) || [];
    } else if (storageMode === 'session') {
        return JSON.parse(sessionStorage.getItem('records')) || [];
    } else if (storageMode === 'cookies') {
        const cookieData = document.cookie.split('; ').find(row => row.startsWith('records='));
        return cookieData ? JSON.parse(decodeURIComponent(cookieData.split('=')[1])) : [];
    }
}

function setStorageData(data) {
    if (storageMode === 'local') {
        localStorage.setItem('records', JSON.stringify(data));
    } else if (storageMode === 'session') {
        sessionStorage.setItem('records', JSON.stringify(data));
    } else if (storageMode === 'cookies') {
        document.cookie = `records=${encodeURIComponent(JSON.stringify(data))}; path=/`;
    }
}

function loadRecords() {
    const records = getStorageData();
    const tableBody = document.querySelector('#recordsTable tbody');
    tableBody.innerHTML = '';

    records.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editRecord(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteRecord(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById('crudForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const records = getStorageData();

    records.push({ name, email });
    setStorageData(records);

    loadRecords();
    this.reset();
});

function editRecord(index) {
    const records = getStorageData();
    const record = records[index];

    document.getElementById('name').value = record.name;
    document.getElementById('email').value = record.email;

    deleteRecord(index);
}

function deleteRecord(index) {
    const records = getStorageData();
    records.splice(index, 1);
    setStorageData(records);
    loadRecords();
}

loadRecords();
