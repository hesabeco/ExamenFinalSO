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
    var tabla = $("<table></table>"); // Usar jQuery para crear el elemento table
  
    // Crea el encabezado de la tabla con el nombre del array
    var thead = $("<thead></thead>"); // Usar jQuery para crear el elemento thead
    var tr = $("<tr></tr>"); // Usar jQuery para crear el elemento tr
    var th = $("<th></th>"); // Usar jQuery para crear el elemento th
    th.append(document.createTextNode("process")); // Usar append para agregar el texto al th
    tr.append(th); // Usar append para agregar el th al tr
    thead.append(tr); // Usar append para agregar el tr al thead
    tabla.append(thead); // Usar append para agregar el thead al table
  
    // Crea el cuerpo de la tabla
    var tbody = $("<tbody></tbody>"); // Usar jQuery para crear el elemento tbody
    tabla.append(tbody); // Usar append para agregar el tbody al table
  
    // Crea las filas
    for (var i = 0; i < PROCESS.length; i++) {
      // Crea las filas de la tabla
      var hilera = $("<tr></tr>"); // Usar jQuery para crear el elemento tr
  
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = $("<td></td>"); // Usar jQuery para crear el elemento td
      var textoCelda = document.createTextNode("Process " + (i + 1));
      celda.append(textoCelda); // Usar append para agregar el texto al td
      hilera.append(celda); // Usar append para agregar el td al tr
  
      // Agrega la hilera al final del cuerpo de la tabla
      tbody.append(hilera); // Usar append para agregar el tr al tbody
    }
    var hileraDispatcher = $("<tr></tr>"); // Usar jQuery para crear el elemento tr
    var celdaDispatcher = $("<td></td>"); // Usar jQuery para crear el elemento td
    var textoCeldaDispatcher = document.createTextNode("Dispatcher");
    celdaDispatcher.append(textoCeldaDispatcher); // Usar append para agregar el texto al td
    hileraDispatcher.append(celdaDispatcher); // Usar append para agregar el td al tr
    tbody.append(hileraDispatcher); // Usar append para agregar el tr al tbody
  
    // Agrega la tabla al cuerpo del documento
    time = 1;
    $("body").append(tabla); // Usar jQuery para agregar el table al body
  
    // Llama a la función para agregar celdas al lado
    agregarCeldaAlLado(tabla,time);
    time++;
    agregarCeldaAlLado(tabla,time);
    time++;
    agregarCeldaAlLado(tabla,time);
    var firstRow = tabla[0].rows[0]; // Usar jQuery para acceder al primer elemento del objeto
    var cellCount = firstRow.cells.length;
    console.log(cellCount);
    // Obtener la celda en la fila 2 y la columna 3
    var celda = tabla.find("tr:eq(1) td:eq(1)");
    // Cambiar el color de fondo de la celda a rojo
    celda.css("background-color", "red"); // Usar jQuery para cambiar el estilo de la celda

  }


// Crear una función que agregue una columna a una tabla
function agregarCeldaAlLado (tabla,time) {
    // Recorrer todas las filas de la tabla
    tabla.find("tr").each (function () {
      var ultimoEncabezado = $(this).find("th").last();
      var nuevoEncabezado = $("<th>" + time + "</th>");
      // Obtener la última celda de la fila actual
      var ultimaCelda = $(this).find("td").last();
      // Crear una nueva celda con el texto "Nueva celda"
      var nuevaCelda = $("<td></td>").addClass("grey");
      // Agregar la nueva celda después de la última celda
      ultimaCelda.after(nuevaCelda);
      ultimoEncabezado.after(nuevoEncabezado);
    });
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