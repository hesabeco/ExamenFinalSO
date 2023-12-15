/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


let PROCESS = [];
let cyclesDispatcher = 0;
let cyclesInterrupts = 0;
let time = 0;
let PCB = [];
function addProcess() {
    const inputElement = document.getElementById('processInput');

    const infoProcess = inputElement.value.trim();

    if (infoProcess !== '') {
        const elements = infoProcess.split(',');
        const isValid = validateElements(elements);
        if (isValid) {
            PROCESS.push(infoProcess.split(','));
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

        cellinfoProcess.textContent = "P-" + i;
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
    time = 1;
    var i=0;
    while (!executionOfAllInstructions()) {
        for (var count = 0; count < PROCESS.length; count++) {
            i = count % PROCESS.length; 
            var existNextElement=false;
            console.log(count);
            var row = i + 1;
            outerLoop: for (var j = 0; j < cyclesInterrupts; j++) {
                var element = PROCESS[i][PCB[i][0]];
                if (element === undefined) {
                    break outerLoop;
                }
                console.log("element :" + element);
                var column = time;
                console.log("columna pinta " + column);
                if (!isNaN(element)) {
                    addCellToSide(table, time);
                    var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
                    cell.css("background-color", "green");
                    PCB[i][0]++;
                    if (PCB[i][0] === PROCESS[i].length) {
                        PCB[i][1] = "R";
                        PCB[i][2] = time;
                    }
                    time++;
                    nextElement = PROCESS[i][PCB[i][0]];
                    if (nextElement !== undefined && isNaN(nextElement)) {
                        time=verifyIfNextIsFTI(table, time,row,column+1,i);
                       existNextElement=true;
                        break outerLoop;
                    }
                }
            }
            if (!executionOfAllInstructions() && !existNextElement) {
                console.log("Probando :" + PROCESS.length + " " + column)
                time = changeContext(table, time, PROCESS.length + 1, column);
                console.log("Dispartcher :" + time);
            }
        }
    }
}

function verifyIfNextIsFTI(table, time,row,column,i){
    addCellToSide(table, time);
    var countIT=0;
    var columnIT=0;
    outerLoop: while(isNaN(PROCESS[i][PCB[i][0]])){
        if(PROCESS[i][PCB[i][0]]==="F"){
            if(countIT>0){
                addCellToSide(table, time);
            }
            var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
            cell.css("background-color", "yellow");
            PCB[i][0]=PCB[i][0]+1;
            if (PCB[i][0] === PROCESS[i].length) {
                PCB[i][1] = "F";
                PCB[i][2] = time;
            }
            if(!executionOfAllInstructions()){
                time=changeContextforF(table, time, PROCESS.length + 1, column);
            }
            break outerLoop;
        }
        if (["I", "T"].includes(PROCESS[i][PCB[i][0]])) {
            if(countIT>0){
                addCellToSide(table, time);
            }
            if(countIT===1){
                columnIT=column-1;
            }
            var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
            cell.css("background-color", "red");
            PCB[i][0]=PCB[i][0]+1;
            if (PCB[i][0] === PROCESS[i].length) {
                PCB[i][1] = (PROCESS[i][PCB[i][0]]);
                PCB[i][2] = time;
            }
            countIT++;
            time++;
        }
        column=time;
    }
    if(columnIT!==0){
        changeContextforITs(table, time, PROCESS.length + 1, columnIT)
    }
    else{
        if(countIT!=0){
        time=changeContextforOneIT(table, time, PROCESS.length + 1, column-1)-1;
        }
    }
    if(countIT>cyclesDispatcher && !executionOfAllInstructions()){
        time=changeContext(table, time, PROCESS.length + 1, column-1);
        countIT=0;
    }
    return time;
}

function changeContext(table, time, row, column) {
    for (var i = 0; i < cyclesDispatcher; i++) {
        column++;
        addCellToSide(table, time);
        var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
        cell.css("background-color", "green");
        time++;
    }
    return time;
}

function changeContextforF(table, time, row, column) {
    for (var i = 0; i < cyclesDispatcher; i++) {
        var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
        cell.css("background-color", "green");
        column++;
        time++;
        if(i!==cyclesDispatcher-1){addCellToSide(table, time)};
    }
    return time;
}

function changeContextforOneIT(table, time, row, column) {
    for (var i = 0; i < cyclesDispatcher; i++) {
        var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
        cell.css("background-color", "green");
        column++;
        if(i!==cyclesDispatcher-1){addCellToSide(table, time)};
        time++;
    }
    return time;
}


function changeContextforITs(table, time, row, column) {
    for (var i = 0; i < cyclesDispatcher; i++) {
        var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
        cell.css("background-color", "green");
        column++;
        time++;
    }
    return time;
}

function executionOfAllInstructions() {
    var isTrue = true;
    for (var i = 0; i < PROCESS.length && isTrue; i++) {
        isTrue = PCB[i][0] === PROCESS[i].length;
    }
    return isTrue;
}

// Crear una función que agregue una columna a una tabla
function addCellToSide(table, time) {
    // Recorrer todas las filas de la tabla
    table.find("tr").each(function () {
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

function createTable(table) {
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
        PCB[i] = [0, 0, 0];
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
    $("body").append(table); // Usar jQuery para agregar el table al body
}

function readAndDisplayData() {
    // read window :
    cyclesDispatcher = prompt("Dispatcher Cycles:");
    cyclesInterrupts = prompt("Interrupts Cycles:");

    cyclesDispatcher = parseInt(cyclesDispatcher);
    cyclesInterrupts = parseInt(cyclesInterrupts);

    if (isNaN(cyclesDispatcher) || isNaN(cyclesInterrupts) || cyclesDispatcher <= 0 || cyclesDispatcher >= 100) {
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
            if (i === 0 && (element === 'F' || element === 'T' || element === 'I')) {
                isValid = false;
                alert("Invalid input: The process must start with a memory address not with " + element);
                break;
            }

            if (element === 'F' && i !== elements.length - 1) {
                isValid = false;
                alert("Invalid entry: 'F' should be the last element and there should only be one F.");
                break;
            }
        } else {
            const number = parseInt(element);
            if (i !== 0 && number !== consecutiveNumber + 1) {
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

            if (number >= 100 && number <= 199) {
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

function convertToUpperCase() {
    // Obtener el valor actual del campo de texto
    var inputValue = document.getElementById("processInput").value;

    // Convertir el valor a mayúsculas
    document.getElementById("processInput").value = inputValue.toUpperCase();
}
