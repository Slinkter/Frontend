let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', e => {
    e.defaultPrevented();
    let nombre = e.target.nombre.value;
    
});



