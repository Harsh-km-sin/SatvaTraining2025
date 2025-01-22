$(document).ready(function () {
    const blankRow = () => `
<tr>
    <td></td>
    <td>
        <select class="form-select" required>
            <option value="" selected></option>
            <option value="JAVA Script Project">JAVA Script Project</option>
            <option value="Python Project">Python Project</option>
            <option value="React Project">React Project</option>
            <option value="Angular Project">Angular Project</option>
        </select>
    </td>
    <td>
        <input type="date" class="form-control" required>
    </td>
    <td>
        <select class="form-select" required>
            <option value="" selected></option>
            <option value="Communication">Communication</option>
            <option value="Analysis">Analysis</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
        </select>
    </td>
    <td>
        <select class="form-select" required>
            <option value="" selected></option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Working">Working</option>
        </select>
    </td>
    <td>
        <input type="text" class="form-control" required>
    </td>
    <td>
        <input type="text" class="form-control" required>
    </td>
    <td>
        <input type="text" class="form-control" required>
    </td>
    <td>
        <input type="checkbox">
    </td>
    <td>
        <input type="text" class="form-control">
    </td>
    <td>
        <input type="text" class="form-control">
    </td>
</tr>
`;

    const initializeInputTable = () => {
        const tbody = $('#projectTable tbody');
        tbody.empty();

        for (let i = 0; i < 1; i++) {
            tbody.append(blankRow());
        }
        updateRowNumbers();
    };

    const updateRowNumbers = () => {
        $('#projectTable tbody tr').each(function (index) {
            $(this).find('td:first').text(index + 1);
        });
    };

    const loadSavedData = () => {
        const savedData = JSON.parse(localStorage.getItem('projectData')) || [];
        const tbody = $('#summaryTable tbody');
        tbody.empty();

        savedData.forEach((row, index) => {
            tbody.append(`
        <tr>
            <td>${index + 1}</td>
            <td>${row.projectName}</td>
            <td>${row.timeLog}</td>
            <td>${row.phase}</td>
            <td>${row.status}</td>
            <td>${row.loggedHours}</td>
            <td>${row.billableHours}</td>
            <td>${row.notes}</td>
            <td>${row.outOfStock ? 'Yes' : 'No'}</td>
            <td>${row.bcLink}</td>
            <td>${row.bcDescription}</td>
        </tr>
    `);
        });
    };

    const saveData = () => {
        const rows = $('#projectTable tbody tr');
        const newData = [];

        rows.each(function () {
            const $row = $(this);
            const projectName = $row.find('select').eq(0).val();
            const timeLog = $row.find('input[type="date"]').val();
            const phase = $row.find('select').eq(1).val();
            const status = $row.find('select').eq(2).val();
            const loggedHours = $row.find('input[type="text"]').eq(0).val();
            const billableHours = $row.find('input[type="text"]').eq(1).val();
            const notes = $row.find('input[type="text"]').eq(2).val();
            const outOfStock = $row.find('input[type="checkbox"]').is(':checked');
            const bcLink = $row.find('input[type="text"]').eq(3).val();
            const bcDescription = $row.find('input[type="text"]').eq(4).val();

            if (projectName && timeLog && phase && status && loggedHours && billableHours && notes) {
                newData.push({
                    projectName,
                    timeLog,
                    phase,
                    status,
                    loggedHours,
                    billableHours,
                    notes,
                    outOfStock,
                    bcLink: bcLink || "",
                    bcDescription: bcDescription || ""
                });
            }
        });

        localStorage.setItem('projectData', JSON.stringify(newData));
        loadSavedData();
    };

    initializeInputTable();  
    loadSavedData();        

    $('#addRowBtn').click(function () {
        let rowCount = parseInt($('#rowCountInput').val()) || 1;
        for (let i = 0; i < rowCount; i++) {
            $('#projectTable tbody').append(blankRow());
        }
        updateRowNumbers();
    });

    $('#deleteRowBtn').click(function () {
        const rowCount = parseInt($('#rowCountInput').val()) || 1;
        const savedData = JSON.parse(localStorage.getItem('projectData')) || [];

        if (savedData.length > 0) {
            const numToDelete = Math.min(rowCount, savedData.length);
            savedData.splice(savedData.length - numToDelete, numToDelete);

            localStorage.setItem('projectData', JSON.stringify(savedData));

            loadSavedData();
        }

        const $lightTableRows = $('#projectTable tbody tr');
        if ($lightTableRows.length - rowCount >= 5) {
            for (let i = 0; i < rowCount; i++) {
                $lightTableRows.last().remove();
            }
            updateRowNumbers();
        }
    });

    $('#projectTable').on('blur', 'input, select', function () {
        saveData();
    });
});