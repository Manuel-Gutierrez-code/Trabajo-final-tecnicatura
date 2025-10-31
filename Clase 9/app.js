function saludar() {
    alert("Hola")
}

function saludarNombre(nombre) {
    alert("Hola " + nombre)
}

function calcular(x, y) { 
    return x * y
}

const calcular2 = (x, y) => x * y

//Las funciones anonimas son para mandar por parametro funciones.


const proximo = (
    function() {
        let numero = 0
        return function() {
            numero++
            return numero
        }
    }
)()

let tradicional = function() {
    alert('funcion tradicional')
}

let flecha = () => alert('funcion flecha')

let promedio = (a, b) => (a + b) / 2

alert(promedio(5, 9))