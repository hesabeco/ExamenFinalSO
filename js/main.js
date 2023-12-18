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
/*
function dispatcher() {
    // Crear una tabla HTML dinámica con el array PROCESS
    var table = $("<table></table>"); // Usar jQuery para crear el elemento table
    createTable(table);
    time = 1;
    var i = 0;
    while (!executionOfAllInstructions()) {
        for (var count = 0; count < PROCESS.length; count++) {
            i = count % PROCESS.length;
            var existNextElement = false;
            var row = i + 1;
            if (PROCESS[i].length === PCB[i][0]) {
                continue;
            }
            outerLoop: for (var j = 0; j < cyclesInterrupts; j++) {
                var element = PROCESS[i][PCB[i][0]];
                console.log(element);
                var column = time;
                if (!isNaN(element)) {
                    addCellToSide(table, time);
                    var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
                    cell.css("background-color", "green");
                    PCB[i][0]++;
                    if (PCB[i][0] === PROCESS[i].length) {
                        PCB[i][1] = time;
                        PCB[i][2] = "R";
                        time++;
                        break outerLoop;
                    }
                    time++;
                    nextElement = PROCESS[i][PCB[i][0]];
                    if (nextElement !== undefined && isNaN(nextElement)) {
                        time = verifyIfNextIsFTI(table, time, row, column + 1, i);
                        existNextElement = true;
                        break outerLoop;
                    }
                }
                else{
                    time = verifyIfNextIsFTI(table, time, row, column, i);
                    existNextElement = true;
                    break outerLoop;
                }
            }
            if (!executionOfAllInstructions() && !existNextElement) {
                console.log("Probando :" + PROCESS.length + " " + column)
                time = changeContext(table, time, PROCESS.length + 1, column);
                console.log("Dispartcher :" + time);
            }
        }
    }
    highlightProcess(table);
    runDispatcher();
}

function verifyIfNextIsFTI(table, time, row, column, i) {
    addCellToSide(table, time);
    var countIT = 0, columnIT = 0, lastState = 0;
    same = true;
    outerLoop: while (isNaN(PROCESS[i][PCB[i][0]]) && same) {
        if (PROCESS[i][PCB[i][0]] === "F") {
            time = instructionF(table, time, row, column, i);
            break outerLoop;
        }
        if (["I", "T"].includes(PROCESS[i][PCB[i][0]])) {
            lastState = PROCESS[i][PCB[i][0]];
            var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
            cell.css("background-color", "red");
            countIT++;
            PCB[i][0] = PCB[i][0] + 1;
            if (PCB[i][0] === PROCESS[i].length) {
                PCB[i][1] = time;
                PCB[i][2] = (PROCESS[i][PCB[i][0]-1]);
            }
            nextElement = PROCESS[i][PCB[i][0]];
            same = false;
            if (nextElement !== undefined) {
                if (nextElement === "F" && columnIT===0) {
                    same = true;
                }
                if(nextElement === "F" && columnIT!==0){
                    same=false;
                    continue;
                }
                if (nextElement === lastState) {
                    if (columnIT === 0) { columnIT = column };
                    same = true;
                    time++;
                    column = time;
                    addCellToSide(table, time);
                    continue;
                }
                else {
                    if (columnIT === 0) {
                        time = changeContextforOneIT(table, time, PROCESS.length + 1, column);
                        nextElement = PROCESS[i][PCB[i][0]];
                        same=false;
                       if (nextElement === "F") { addCellToSide(table, time); same = true; }
                    }
                }

            }
            else{
                time = changeContextforOneIT(table, time, PROCESS.length + 1, column);
            }
        }
        column = time;
    }
    if (columnIT !== 0) {
        changeContextforITs(table, time, PROCESS.length + 1, columnIT);
        if(countIT === cyclesDispatcher){
            time++;
            if ( nextElement==="F"){
            addCellToSide(table,time);
            time=instructionF(table, time, row, column+1, i);
            }
        }
        
    }
    if (countIT > cyclesDispatcher && !executionOfAllInstructions()) {
        time = changeContext(table, time+1, PROCESS.length + 1, column);
        if(nextElement==="F"){
        addCellToSide(table,time);
        column = time;
        time=instructionF(table, time, row, column, i) }
        countIT = 0;
    }
    return time;
}
*/
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
        if (i !== cyclesDispatcher - 1) { addCellToSide(table, time) };
    }
    return time;
}

function changeContextforOneIT(table, time, row, column) {
    for (var i = 0; i < cyclesDispatcher; i++) {
        var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
        cell.css("background-color", "green");
        column++;
        time++;
        if (i !== cyclesDispatcher - 1) { addCellToSide(table, time) };
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

function instructionF(table, time, row, column, i) {
    var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
    cell.css("background-color", "yellow");
    PCB[i][0] = PCB[i][0] + 1;
    if (PCB[i][0] === PROCESS[i].length) {
        PCB[i][1] = time;
        PCB[i][2] = "F";
    }
    if (!executionOfAllInstructions()) {
        time = changeContextforF(table, time, PROCESS.length + 1, column);
    }
    return time;
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
    th.append(document.createTextNode("Process")); // Usar append para agregar el texto al th
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
        var textCell = document.createTextNode("P-" + (i + 1));
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
    $("#tableContainer").append(table); // Usar jQuery para agregar el table al body
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

            if (element.includes('.')) {
                isValid = false;
                alert("Invalid input: " + element + ". Should be an integer.");
                break;
            }
            const number = parseInt(element);
            if (number < 0) {
                isValid = false;
                alert("Invalid input: " + element + ". Numbers should be positive.");
                break;
            }
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

function dispatcher() {
    // Crear una tabla HTML dinámica con el array PROCESS
    var table = $("<table></table>"); // Usar jQuery para crear el elemento table
    createTable(table);
    time = 1;
    var i = 0;
    while (!executionOfAllInstructions()) {
        for (var count = 0; count < PROCESS.length; count++) {
            i = count % PROCESS.length;
            var existNextElement = false;
            var row = i + 1;
            if (PROCESS[i].length === PCB[i][0]) {
                continue;
            }
            outerLoop: for (var j = 0; j < cyclesInterrupts; j++) {
                var element = PROCESS[i][PCB[i][0]];
                var column = time;
                if (element === "F") {
                    addCellToSide(table, time);
                    time = instructionF(table, time, row, column, i);
                    existNextElement = true;
                    break outerLoop;
                }
                if (!isNaN(element)) {
                    addCellToSide(table, time);
                    var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
                    cell.css("background-color", "green");
                    PCB[i][0]++;
                    if (PCB[i][0] === PROCESS[i].length) {
                        PCB[i][1] = time;
                        PCB[i][2] = "R";
                        time++;
                        break outerLoop;
                    }
                    time++;
                    nextElement = PROCESS[i][PCB[i][0]];
                    if (nextElement !== undefined && isNaN(nextElement)) {
                        time = verifyIfNextIsFTI(table, time, row, column + 1, i);
                        existNextElement = true;
                        break outerLoop;
                    }
                }
                else {
                    time = verifyIfNextIsFTI(table, time, row, column, i);
                    existNextElement = true;
                    break outerLoop;
                }
            }
            if (!executionOfAllInstructions() && !existNextElement) {
                time = changeContext(table, time, PROCESS.length + 1, column);
            }
        }
    }
    highlightProcess(table);
    runDispatcher();
}

function verifyIfNextIsFTI(table, time, row, column, i) {
    addCellToSide(table, time);
    var countIT = 0, columnIT = 0, lastState = 0;
    same = true;
    outerLoop: while (isNaN(PROCESS[i][PCB[i][0]]) && same) {
        if (PROCESS[i][PCB[i][0]] === "F") {
            time = instructionF(table, time, row, column, i);
            break outerLoop;
        }
        if (["I", "T"].includes(PROCESS[i][PCB[i][0]])) {
            lastState = PROCESS[i][PCB[i][0]];
            var cell = table.find("tr:eq(" + row + ") td:eq(" + column + ")");
            cell.css("background-color", "red");
            countIT++;
            PCB[i][0] = PCB[i][0] + 1;
            if (PCB[i][0] === PROCESS[i].length) {
                PCB[i][1] = time;
                PCB[i][2] = (PROCESS[i][PCB[i][0] - 1]);
            }
            nextElement = PROCESS[i][PCB[i][0]];
            same = false;
            if (nextElement !== undefined) {
                if (nextElement === "F" && columnIT === 0) {
                    same = true;
                }
                if (nextElement === "F" && columnIT !== 0) {
                    same = false;
                    continue;
                }
                if (nextElement === lastState) {
                    if (columnIT === 0) { columnIT = column };
                    same = true;
                    time++;
                    column = time;
                    addCellToSide(table, time);
                    continue;
                }
                else {
                    if (columnIT === 0) {
                        time = changeContextforOneIT(table, time, PROCESS.length + 1, column);
                        nextElement = PROCESS[i][PCB[i][0]];
                        same = false;
                        // if (nextElement === "F") { addCellToSide(table, time); same = true; }
                    }
                }

            }
            else {
                time = changeContextforOneIT(table, time, PROCESS.length + 1, column);
            }
        }
        column = time;
    }
    if (columnIT !== 0) {
        changeContextforITs(table, time, PROCESS.length + 1, columnIT)
        time = (countIT === cyclesDispatcher) ? ++time : time;
    }
    if (countIT > cyclesDispatcher && !executionOfAllInstructions()) {
        time = changeContext(table, time + 1, PROCESS.length + 1, column);
        countIT = 0;
        same = true;
    }
    return time;
}

function convertToUpperCase() {
    var inputField = document.getElementById("processInput");
    var cursorPosition = inputField.selectionStart;

    // Obtén el valor actual del campo de texto
    var inputValue = inputField.value;

    // Obtén la letra ingresada (en minúsculas)
    var typedChar = inputValue.charAt(cursorPosition - 1);

    // Verifica si la letra es válida (no es null) y conviértela a mayúsculas
    if (typedChar !== null) {
        typedChar = typedChar.toUpperCase();
    }

    // Modificar el valor del campo de texto con la letra convertida
    var newValue = inputValue.substring(0, cursorPosition - 1) + typedChar + inputValue.substring(cursorPosition);

    // Actualizar el valor del campo de texto
    inputField.value = newValue;

    // Mover el cursor a la posición correcta
    inputField.setSelectionRange(cursorPosition, cursorPosition);
}

function createTable2() {
    var table = $("<table></table>");
    var thead = $("<thead></thead>");
    var tr = $("<tr></tr>");
    var headers = ["Process", "Execution Time", "State Final"];

    for (var i = 0; i < headers.length; i++) {
        var th = $("<th></th>").text(headers[i]);
        tr.append(th);
        th.css("text-align", "center");
    }
    thead.append(tr);
    table.append(thead);
    var tbody = $("<tbody></tbody>");
    table.append(tbody);
    for (var i = 0; i < PCB.length; i++) {
        var row = $("<tr></tr>");

        for (var j = 0; j < 3; j++) {
            var cell = $("<td></td>").text(PCB[i][j]);
            if (j === 2) {
                if (PCB[i][j] === "Finish") {
                    cell.css("background-color", "yellow");
                } else if (PCB[i][j] === "Block") {
                    cell.css("background-color", "red");
                }
            }
            cell.css("text-align", "center");
            row.append(cell);
        }

        tbody.append(row);
    }

    // Agrega la tabla al body usando jQuery
    $("#tableContainer").append(table);
}

function getMaxExecutionTime() {
    var maxExecutionTime = 0;
    for (var i = 0; i < PCB.length; i++) {
        if (PCB[i][1] > maxExecutionTime) {
            maxExecutionTime = PCB[i][1];
        }
    }
    return maxExecutionTime;
}

function modPCB() {
    var maxExecutionTime = getMaxExecutionTime();
    for (var i = 0; i < PCB.length; i++) {
        PCB[i][0] = "P-" + (i + 1);
        if (["I", "T", "R"].includes(PCB[i][2])) {
            PCB[i][1] = maxExecutionTime;
            PCB[i][2] = "Block";
        } else {
            PCB[i][2] = "Finish";
        }
    }
}

function runDispatcher() {
    modPCB();
    createTable2();
    var maxExecutionTime = getMaxExecutionTime();
    var outDispatcherTime = $("#outDispatcherTime");
    outDispatcherTime.text("How much time take to end their execution? R/ " + maxExecutionTime);
}

function highlightProcess(table) {
    // Obtener el tiempo máximo de ejecución
    var maxExecutionTime = getMaxExecutionTime();

    // Iterar sobre el PCB
    for (var i = 0; i < PCB.length; i++) {
        var processState = PCB[i][2];

        // Verificar si el proceso termina en "T", "I" o "R"
        if (["T", "I", "R"].includes(processState)) {
            // Obtener la posición actual y el tiempo máximo para el proceso
            var currentPosition = PCB[i][1];
            var highlightEnd = maxExecutionTime;

            // Pintar desde la posición actual hasta el tiempo máximo
            highlightRow(table, i, currentPosition+1, highlightEnd);
        }
    }
}

function highlightRow(table, rowNumber, start, end) {
    // Obtener la fila correspondiente
    var row = table.find("tr:eq(" + (rowNumber + 1) + ")"); // Se suma 1 porque los índices de las filas comienzan desde 1 en lugar de 0

    // Iterar sobre las celdas de la fila y aplicar el resaltado
    if (end !== start) {
        for (var j = start; j <= end; j++) {
            var cell = row.find("td:eq(" + j + ")");
            cell.css("background-color", "red");
        }
    }
}