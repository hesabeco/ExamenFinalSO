
function validateForm() {
    var input = document.getElementById('cantidadProcesos');
    if (input.checkValidity() === false) {
      alert('Please enter a valid number greater than or equal to 1.');
      return false;
    }
  
    var cantidadProcesos = parseInt(input.value);
    generateLabels(cantidadProcesos);
  
    return true;
  }
  
  function generateLabels(cantidadProcesos) {
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
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    var offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasNavbar'));
    offcanvas.show();
  });
  
