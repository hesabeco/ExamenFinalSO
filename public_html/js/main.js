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
        if (isValid) {
        PROCESS.push(infoProcess);
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

function dispatcher(){
    document.getElementById("outDistpatcher").textContent = "Must print the dispatcher run table";
}


 function readAndDisplayData() {
      // read window :
      cyclesDispatcher = prompt("Dispatcher Cycles:");
      cyclesInterrupts = prompt("Interrupts Cycles:");
   
      cyclesDispatcher = parseInt(cyclesDispatcher);
      cyclesInterrupts = parseInt(cyclesInterrupts);

    if (isNaN(cyclesDispatcher) || isNaN(cyclesInterrupts) || cyclesDispatcher <= 0 || cyclesInterrupts < cyclesDispatcher) {
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
                    alert("Invalid element: " + element + ". Should be 'T', 'I', or 'F'");
                    break;
                }
                if (element === 'F' && i !== elements.length - 1) {
                    isValid = false;
                    alert("Invalid element: 'F' should be the last element.");
                    break;
                }
            } else {
                const number = parseInt(element);
                if (i == 0 && number !== 1) {
                    isValid = false;
                    alert("Invalid element: " + element + ". Sequence should start with '1'.");
                    break;
                }
                if (number !== consecutiveNumber + 1) {
                    isValid = false;
                    alert("Invalid element: " + element + ". Should be consecutive.");
                    break;
                }
    
                consecutiveNumber = number;
            }
        }
    
        return isValid;
    }
    
