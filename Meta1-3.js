/*
Lista con las líneas de códigos predefinidas
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
rango mínimo y máximo
*/
function obtenerNumeroAleatorio(max, min) { 
    const minimoTotal = Math.ceil(min);
    const maximoTotal = Math.floor(max);
    return Math.floor(Math.random() * (maximoTotal - minimoTotal) + minimoTotal);
}

/*
Función que agrega líneas de código a los procesos contenidos
en la lista de procesos, la cantidad de líneas de código varía siempre entre
1 y 3
*/
function elegirLineas(procesoIndividual){ 
    for(let i = 0; i < obtenerNumeroAleatorio(4,1); i++){
        procesoIndividual.lineas.push(lineasDeCodigo[obtenerNumeroAleatorio(8,0)]);
    }
}

/*
Función que regresa la cantidad máxima de líneas de código 
contenidas en los procesos, esto con el fin de saber el número
de veces que se ejecutarán todos los procesos y si estos han
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
Función que inicializa la lista de procesos y los atributos de
los procesos, estos atributos son el número de proceso
y las líneas de código, este último se inicializa vacío para poder
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
Función que inicia la simulación del algoritmo de calendarización
de procesos Round Robin simplificado. Este imprime cada uno de los procesos
junto con las líneas de código de forma secuencial. En caso de no encontrar 
mas líneas de código en un proceso, este define el proceso como terminado.
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
