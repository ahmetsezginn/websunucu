function createTable(rows, cols, data = []) {
    const table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < cols; j++) {
            const cell = row.insertCell();
            cell.contentEditable = true;
            cell.innerText = data[i] && data[i][j] ? data[i][j] : '';
        }
    }
    return table;
}

function sendTableDataToServer(tableData) {
    fetch('http://localhost:3000/api/table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}
function setupTableListeners(table) {
    for (let row of table.rows) {
        for (let cell of row.cells) {
            cell.addEventListener('blur', () => {
                const tableData = Array.from(table.rows).map(row => 
                    Array.from(row.cells).map(cell => cell.textContent)
                );
                sendTableDataToServer(tableData);
            });
        }
    }
}

function loadTableDataFromServer() {
    fetch('http://localhost:3000/api/table')
        .then(response => response.json())
        .then(data => {
            const table = createTable(10, 5, data);
            setupTableListeners(table);
            const tableContainer = document.getElementById('table-container');
            tableContainer.innerHTML = ''; // Mevcut tabloyu temizle
            tableContainer.appendChild(table);
        })
        .catch((error) => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadTableDataFromServer(); // Bu fonksiyon sayfa yüklendiğinde çalışır
});