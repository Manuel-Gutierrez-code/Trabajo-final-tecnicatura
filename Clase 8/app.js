let esValido = false
let dia, mes, anio

while (!esValido) {
    esValido = true

    dia = parseInt(prompt("Ingrese el día:"))
    mes = parseInt(prompt("Ingrese el mes:"))
    anio = parseInt(prompt("Ingrese el año:"))

    let esBisiesto = (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)

    if (typeof dia !== "number" || isNaN(dia)) {
        alert("Fecha inválida: el día debe ser un número.")
        esValido = false
    } // Dia es un numero

    if (typeof mes !== "number" || isNaN(mes)) { 
        alert("Fecha inválida: el mes debe ser un número.")
        esValido = false
    } // Mes es un numero

    if (mes < 1 || mes > 12) {
        alert("Fecha inválida: el mes debe estar entre 1 y 12.")
        esValido = false
    } // Mes entre 1 y 12

    switch(mes) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            if (dia < 1 || dia > 31) {
                alert("Fecha inválida: el día debe estar entre 1 y 31 para el mes ingresado.")
                esValido = false
            }
            break
        case 4: case 6: case 9: case 11:
            if (dia < 1 || dia > 30) {
                alert("Fecha inválida: el día debe estar entre 1 y 30 para el mes ingresado.")
                esValido = false
            }
            break
        case 2:
            if (esBisiesto && (dia < 1 || dia > 29)) {
                alert("Fecha inválida: el día debe estar entre 1 y 29 para el mes ingresado en un año bisiesto.")
                esValido = false
            }
            if (!esBisiesto && (dia < 1 || dia > 28)) {
                alert("Fecha inválida: el día debe estar entre 1 y 28 para el mes ingresado.")
                esValido = false
            }
            break
        default:
            alert("Fecha inválida: el día no es correcto para el mes indicado.")
            esValido = false    
            break
    }

    if (typeof anio !== "number" || isNaN(anio)) {
        alert("Fecha inválida: el año debe ser un número.")
        esValido = false
    } // Año es un numero

    if (anio < 1) {
        alert("Fecha inválida: el año debe ser un número positivo.")
        esValido = false
    } // Año positivo
}

alert(`La fecha ingresada es: ${dia}/${mes}/${anio}`)

if (dia > 20 && mes === 12 || mes < 3 || dia < 21 && mes === 3) alert("Estamos en verano")

else if (mes >= 3 && mes < 6 || dia < 21 && mes === 6) alert("Estamos en otoño")

else if (mes >= 6 && mes < 9 || dia < 21 && mes === 9) alert("Estamos en invierno")

else alert("Estamos en primavera")