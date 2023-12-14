/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


let PROCESS = [];
let cyclesDispatcher=0;
let cyclesInterrupts=0;

function addProcess() {
    const inputElement = document.getElementById('processInput');

    const infoProcess = inputElement.value.trim();

    if (infoProcess !== '') {
        const elements = infoProcess.split(',');
        const isValid = validateElements(elements);
        console.log(isValid);
        if (isValid) {
        PROCESS.push(infoProcess.split(','));
        console.log(PROCESS);
        inputElement.value = '';
        document.getElementById("size").textContent = PROCESS.length;
        }
    } else {
    alert("Please enter process information separated by commas."); 
    }
}

function showR() {
    const outBody = document.getElementById('outBody');
    outBody.innerHTML = '';

    for (let i = 0; i < PROCESS.length; i++) {
        const Out = procesarinfoProcess(PROCESS[i]);

        const row = document.createElement('tr');
        const cellinfoProcess = document.createElement('td');
        const cellOut = document.createElement('td');

        cellinfoProcess.textContent = "P-"+i;
        cellOut.textContent = PROCESS[i];

        row.appendChild(cellinfoProcess);
        row.appendChild(cellOut);

        outBody.appendChild(row);
    }
}

function procesarinfoProcess(infoProcess) {
    // Aquí puedes realizar cualquier procesamiento necesario en la infoProcess
    // En este ejemplo, simplemente devolvemos la longitud de la infoProcess
    return infoProcess.length;
}

function dispatcher() {
    // Crear una tabla HTML dinámica con el array PROCESS
    var table = $("<table></table>"); // Usar jQuery para crear el elemento table
    createTable(table);
    for (var i=0; i<PROCESS.length; i++){

        for(var j=0; j<cyclesInterrupts; j++){
            var element = PROCESS[1][2];
            if (isNaN(element)) {
                
            }
            else{

            }
  }


// Crear una función que agregue una columna a una tabla
function addCellToSide (table,time) {
    // Recorrer todas las filas de la tabla
    table.find("tr").each (function () {
      var lastHeader = $(this).find("th").last();
      var newHeader = $("<th>" + time + "</th>");
      // Obtener la última celda de la fila actual
      var lastCell = $(this).find("td").last();
      // Crear una nueva celda con el texto "Nueva celda"
      var newCell = $("<td></td>").addClass("grey");
      // Agregar la nueva celda después de la última celda
      lastCell.after(newCell);
      lastHeader.after(newHeader);
    });
  }
  
 function createTable(table){
       // Crea el encabezado de la tabla con el nombre del array
    var thead = $("<thead></thead>"); // Usar jQuery para crear el elemento thead
    var tr = $("<tr></tr>"); // Usar jQuery para crear el elemento tr
    var th = $("<th></th>"); // Usar jQuery para crear el elemento th
    th.append(document.createTextNode("process")); // Usar append para agregar el texto al th
    tr.append(th); // Usar append para agregar el th al tr
    thead.append(tr); // Usar append para agregar el tr al thead
    table.append(thead); // Usar append para agregar el thead al table
  
    // Crea el cuerpo de la tabla
    var tbody = $("<tbody></tbody>"); // Usar jQuery para crear el elemento tbody
    table.append(tbody); // Usar append para agregar el tbody al table
  
    // Crea las filas
    for (var i = 0; i < PROCESS.length; i++) {
      // Crea las filas de la tabla
      var row = $("<tr></tr>"); // Usar jQuery para crear el elemento tr
  
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var cell = $("<td></td>"); // Usar jQuery para crear el elemento td
      var textCell = document.createTextNode("Process " + (i + 1));
      cell.append(textCell); // Usar append para agregar el texto al td
      row.append(cell); // Usar append para agregar el td al tr
  
      // Agrega la hilera al final del cuerpo de la tabla
      tbody.append(row); // Usar append para agregar el tr al tbody
    }
    var rowDispatcher = $("<tr></tr>"); // Usar jQuery para crear el elemento tr
    var cellDispatcher = $("<td></td>"); // Usar jQuery para crear el elemento td
    var textCellDispatcher = document.createTextNode("Dispatcher");
    cellDispatcher.append(textCellDispatcher); // Usar append para agregar el texto al td
    rowDispatcher.append(cellDispatcher); // Usar append para agregar el td al tr
    tbody.append(rowDispatcher); // Usar append para agregar el tr al tbody
  
    // Agrega la tabla al cuerpo del documento
   /* time = 1;
    $("body").append(table); // Usar jQuery para agregar el table al body
    time = 1;
    // Llama a la función para agregar celdas al lado
    addCellToSide(table,time);
    time++;
    addCellToSide(table,time);
    time++;
    addCellToSide(table,time);
    var firstRow = table[0].rows[0]; // Usar jQuery para acceder al primer elemento del objeto
    var cellCount = firstRow.cells.length;
    console.log(cellCount);
    // Obtener la celda en la fila 2 y la columna 3
    var cell = table.find("tr:eq(1) td:eq(1)");
    // Cambiar el color de fondo de la celda a rojo
    cell.css("background-color", "red"); // Usar jQuery para cambiar el estilo de la celda*/

 }
 function readAndDisplayData() {
      // read window :
      cyclesDispatcher = prompt("Dispatcher Cycles:");
      cyclesInterrupts = prompt("Interrupts Cycles:");
   
      cyclesDispatcher = parseInt(cyclesDispatcher);
      cyclesInterrupts = parseInt(cyclesInterrupts);

    if (isNaN(cyclesDispatcher) || isNaN(cyclesInterrupts) || cyclesDispatcher <= 0 || cyclesDispatcher >=100 || cyclesInterrupts < cyclesDispatcher) {
        alert("Invalid input. Please enter valid values. Dispatcher Cycles should be greater than 0, and Interrupts Cycles should be greater or equal to Dispatcher Cycles.");
        return;
    }

      // Show data
      document.getElementById("result").innerHTML = `
        <p>Dispatcher Cycles: ${cyclesDispatcher}</p>
        <p>Interrupts Cycles: ${cyclesInterrupts}</p>
      `;
    }

    function validateElements(elements) {
        let isValid = true;
        let consecutiveNumber = 0;
    
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
    
            if (isNaN(element)) {
                if (element !== 'T' && element !== 'I' && element !== 'F') {
                    isValid = false;
                    alert("Invalid input: " + element + ". Should be 'T', 'I', or 'F'");
                    break;
                }
                if (i===0 && (element === 'F'|| element === 'T' || element === 'I')) {
                    isValid = false;
                    alert("Invalid input: The process must start with a memory address not with "+ element);
                    break;
                }

                if (element === 'F' && i !== elements.length - 1) {
                    isValid = false;
                    alert("Invalid input: 'F' should be the last element.");
                    break;
                }
            } else {
                const number = parseInt(element);
                if (i!==0 && number !== consecutiveNumber + 1) {
                    isValid = false;
                    alert("Invalid input: " + element + ". Should be consecutive.");
                    break;
                }
                consecutiveNumber = number;
                
               if (deepIncludes(PROCESS, element)) {
                    isValid = false;
                    alert("Invalid input: " + element + ". This memory address is already in another process, click the show button to know the memory addresses used previously");
                    break;
                }

                if(number >= 100 && number <= 199) {
                    isValid = false;
                    alert("Invalid input: " + element + ". Memory addresses from 100 to 199 are reserved for the dispatcher");
                    break;
                }
            }

        }
        return isValid;
    }
    
    function deepIncludes(arr, value) {
        for (let subArray of arr) {
          if (subArray.includes(value.toString())) {
            return true;
          }
        }
        return false;
      }

      