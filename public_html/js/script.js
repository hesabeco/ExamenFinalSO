
  /*let PROCESS = [];
  let cyclesDispatcher=0;
  let cyclesInterrupts=0;

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

  }

  function generateTables(cantidadProcesos) {
    var tableContainer = document.getElementById("table");
    tableContainer.innerHTML = '';

    var idProc = document.getElementById("but");
    idProc.style.display = 'block';

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
    var resultString = '';
    var tableProcess = document.getElementById("tableProcess");
    tableProcess.innerHTML = '';
    for (var i = 1; i <= procesos.value; i++) {
      var tbody = tables[i - 1].getElementsByTagName('tbody')[0];
      var rows = tbody.getElementsByTagName('tr');

      // Declara resultString dentro del bucle externo
      var resultString = '';
      

      for (var j = 0; j < rows.length; j++) {
          var cells = rows[j].getElementsByTagName('td');
          for (var k = 0; k < cells.length; k++) {
              var input = cells[k].querySelector('input');
              if (input) {
                  resultString += input.value;
              }
          }
          if (j < (rows.length - 1)) {
              resultString += ',';
          }
      }

      // Crear una nueva fila en tableProcess
      var newRow = tableProcess.insertRow(tableProcess.rows ? tableProcess.rows.length : 0);

      // Agregar celda para el número de proceso
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = 'Proceso ' + i;

      // Agregar celda para el resultado de resultString
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = resultString;
      PROCESS[i-1]= resultString;
    }

    // Ocultar la tabla original
    tableContainer.style.display = 'none';

    var processTableTitle = document.getElementById("processTableTitle");
    processTableTitle.style.display = 'block';

    var processTable = document.getElementById("tab");
    processTable.style.display = 'block';

    var idPro = document.getElementById("proc");
    idPro.style.display = 'none';

    var idProc = document.getElementById("but");
    idProc.style.display = 'none';

    var idData = document.getElementById("data");
    idData.style.display = 'block';

    for(var i=0; i < PROCESS.length; i++){
      console.log(PROCESS[i])
    }
  }

  function getDataProcess() {
    // Obtener valores de los inputs
    var dispacher = document.getElementById("dispacherValue");
    cyclesDispatcher = dispacher.value;

    var interrupts = document.getElementById("interrupValue");
    cyclesInterrupts = interrupts.value;

    // Imprimir valores en la consola
    console.log(cyclesDispatcher);
    console.log(cyclesInterrupts);

    // Seleccionar la tabla y su cuerpo
    var tableData = document.getElementById("tableData");
    if (!tableData) {
        console.error("Elemento 'tableData' no encontrado.");
        return;
    }

    // Limpiar contenido existente
    tableData.innerHTML = '';

    // Crear una nueva fila en la tabla para dispacher
    var newRowDispacher = tableData.insertRow(tableData.rows ? tableData.rows.length : 0);

    // Agregar celda para el tipo (Dispacher)
    var cell1Dispacher = newRowDispacher.insertCell(0);
    cell1Dispacher.innerHTML = 'Dispacher';

    // Agregar celda para el valor de dispacher
    var cell2Dispacher = newRowDispacher.insertCell(1);
    cell2Dispacher.innerHTML = cyclesDispatcher;

    // Crear otra nueva fila en la tabla para interrupst
    var newRowInterrupst = tableData.insertRow(tableData.rows ? tableData.rows.length : 0);

    // Agregar celda para el tipo (Interrupst)
    var cell1Interrupst = newRowInterrupst.insertCell(0);
    cell1Interrupst.innerHTML = 'Interrupst';

    // Agregar celda para el valor de interrupts
    var cell2Interrupst = newRowInterrupst.insertCell(1);
    cell2Interrupst.innerHTML = cyclesInterrupts;

    // Mostrar la tabla y el título
    var processTableTi = document.getElementById("processTableTi");
    processTableTi.style.display = 'block';

    var tableDataContainer = document.getElementById("data");
    if (!tableDataContainer) {
        console.error("Elemento 'data' no encontrado.");
        return;
    }
    tableDataContainer.style.display = 'block';
}
*/




