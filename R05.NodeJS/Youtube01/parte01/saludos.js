function saludar(nombre) {
    return `Hola , ${nombre}`;
}

function saludarHolaMundo() {
    return "hola mundo";
}

module.exports = {
    saludar: saludar,
    saludarHolaMundo: saludarHolaMundo,
};

/* 
module.exports.saludar = saludar;
module.exports.saludarHolaMundo = saludarHolaMundo;
 */
