/*
Lista con las lineas de codigos predefindas
*/
const lineasDeCodigo = [
    'a = 1 + 2;',
    'console.log("1 + 2");',
    'console.log(a);',
    'b = 3 + 4;',
    'console.log("3 + 4");',
    'c = 5 + 6;',
    'console.log("5 + 6");',
    'console.log(c);'
];

/*
Función que regresa un número entero aleatorio entre un
rango minimo y maximo
*/
function obtenerNumeroAleatorio(max, min) { 
    const minimoTotal = Math.ceil(min);
    const maximoTotal = Math.floor(max);
    return Math.floor(Math.random() * (maximoTotal - minimoTotal) + minimoTotal);
}

/*
Funcion que agrega lineas de codigo a los procesos contenidos
en la lista de procesos, la cantidad de lineas de codigo varia siempre entre
1 y 3
*/
function elegirLineas(procesoIndividual){ 
    for(let i = 0; i < obtenerNumeroAleatorio(4,1); i++){
        procesoIndividual.lineas.push(lineasDeCodigo[obtenerNumeroAleatorio(8,0)]);
    }
}

/*
Funcion que regresa la cantidad maxima de lineas de codigo 
contenidas en los procesos, esto con el fin de saber el numero
de veces que se ejecutaran todos los procesos y si estos han
terminado de ejecutarse.
*/
const cantidadMaximaDeLineaDeCodigo = function(listaDeProcesos){
    let cantidadMaxima = 0;
    for(let numeroProceso of listaDeProcesos){
        if(cantidadMaxima < numeroProceso.lineas.length){
            cantidadMaxima = numeroProceso.lineas.length;
        }
    }
    return cantidadMaxima;
}

/*
Funcion que inicializa la lista de procesos y los atributos de
los procesos, estos atributos son el numero de proceso
y las lineas de codigo, este ultimo se inicializa vacio para poder
agregarse aleatoriamente por proceso.
*/
function inicializarSimulacion(numeroDeProcesos){
    const procesos = [];
    for(let i = 0; i < numeroDeProcesos; i++){
        const proceso = {
            numeroDeProceso: i+1,
            lineas: []
        };
        elegirLineas(proceso);
        procesos.push(proceso);
    }
    return procesos;
}

/*
Funcion que inicia la simulacion del algoritmo de calendarizacion
de procesos Round Robin simplificado. Este imprime cada uno de los procesos
junto con las lineas de codigo de forma secuencial. En caso de no encontrar 
mas lineas de codigo en un proceso, ese define el proceso como terminado.
*/
function iniciarSimulacion(listaDeProcesos){
    for(let i = 0; i < cantidadMaximaDeLineaDeCodigo(listaDeProcesos); i++){
        for(let j = 0; j < Object.keys(listaDeProcesos).length; j++){
            document.getElementById("cardBody").innerText += "Proceso " + listaDeProcesos[j].numeroDeProceso + "\n";
            if(listaDeProcesos[j].lineas[i] === undefined){
               document.getElementById("cardBody").innerText += "Proceso terminado\n";
            } else {
               document.getElementById("cardBody").innerText += "Linea de codigo: " + listaDeProcesos[j].lineas[i] + "\n";
            }
        }
    }
}


let numeroDeProcesos = prompt('Ingresa la cantidad de procesos: '); //Input para pedir la cantidad de procesos

/*
Inicio del programa
*/
if(numeroDeProcesos > 0){
    iniciarSimulacion(inicializarSimulacion(numeroDeProcesos));
} else {
    document.getElementById("cardBody").innerText = "Ingresa un numero valido";
}
