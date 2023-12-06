
  function validateForm(){
    var input = document.getElementById('cantidadProcesos');
    if (input.checkValidity() === false) {
      alert('Please enter a valid number greater than or equal to 1.');
    }
    
    var cantidadProcesos = parseInt(input.value);
    //generateLabels(cantidadProcesos);
    generateTables(cantidadProcesos);
    
    
  }
  
 /* function generateLabels(cantidadProcesos) {
    var labelsContainer = document.getElementById('labelsContainer');
    labelsContainer.innerHTML = '';
  
    for (var i = 1; i <= cantidadProcesos; i++) {
      var divContainer = document.createElement('div');
      divContainer.classList.add('mb-3');
  
      var label = document.createElement('label');
      label.textContent = 'Proceso ' + i;
      label.setAttribute('for', 'proceso' + i);
  
      var input = document.createElement('input');
      input.id = 'proceso' + i;
      input.name = 'proceso' + i;
      input.type = 'text';
      input.placeholder = 'Ingrese el nombre del proceso';
      input.classList.add('form-control');
  
      divContainer.appendChild(label);
      divContainer.appendChild(input);
  
      labelsContainer.appendChild(divContainer);
    }

    var offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasNavbar'));
    offcanvas.show();

  }*/

  function generateTables(cantidadProcesos) {
    var tableContainer = document.getElementById("table");
    tableContainer.innerHTML = '';

    for (var i = 1; i <= cantidadProcesos; i++) {
        var table = document.createElement('table');
        table.id = i;
        table.classList.add('table', 'table-bordered');

        var thead = document.createElement('thead');
        var headerRow = document.createElement('tr');
        var headerCell = document.createElement('th');
        headerCell.textContent = 'Proceso ' + i;
        headerRow.appendChild(headerCell);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        var tbody = document.createElement('tbody');
        for(var z=0; z < 2; z++){
          var row = document.createElement('tr');
          var cell = document.createElement('td');
          var input = document.createElement('input');
          input.id = 'proceso' + i + z;
          input.name = 'proceso' + i + z;
          input.type = 'text';
          input.placeholder = 'Ingrese el nombre del proceso';
          input.classList.add('form-control');
          cell.appendChild(input);
          row.appendChild(cell);
          tbody.appendChild(row);
        }
        // Agregar botón para agregar nueva fila
        var addButtonCell = document.createElement('th');
        addButtonCell.innerHTML = '<button class="btn btn-primary" onclick="addRow(' + i + ')">Agregar Fila</button>';
        tbody.appendChild(addButtonCell);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }
  }



  function addRow(tableIndex) {
    var table = document.getElementById('table').getElementsByTagName('table')[tableIndex - 1];
    var tbody = table.getElementsByTagName('tbody')[0];
    
    var rowCount = tbody.getElementsByTagName('tr').length + 1;

    var row = document.createElement('tr');
    var cell = document.createElement('td');
    var input = document.createElement('input');
    input.id = 'proceso' + tableIndex + '-' + rowCount;
    input.name = 'proceso' + tableIndex + '-' + rowCount;
    input.type = 'text';
    input.placeholder = 'Ingrese el nombre del proceso';
    input.classList.add('form-control');
    cell.appendChild(input);
    row.appendChild(cell);

    // Obtener el botón existente
    var addButtonCell = tbody.querySelector('button');

    // Insertar la nueva fila antes del botón
    tbody.insertBefore(row, addButtonCell.parentNode);
  }

  function getValue() {
    var procesos = document.getElementById("cantidadProcesos");
    var tableContainer = document.getElementById("table");
    var tables = tableContainer.getElementsByTagName('table');
    console.log(procesos.value);
    var resultString = '';

    for (var i = 1; i <= procesos.value; i++) {
        var tbody = tables[i - 1].getElementsByTagName('tbody')[0];
        var rows = tbody.getElementsByTagName('tr');

        for (var j = 0; j < rows.length; j++) {
            var cells = rows[j].getElementsByTagName('td');
            for (var k = 0; k < cells.length; k++) {
                var input = cells[k].querySelector('input');
                if (input) {
                    resultString += input.value;
                }
            }
            if(j < (rows.length - 1)){
              resultString += ',';
            }
        }
        resultString += '//';
    }

    console.log(resultString);
}


