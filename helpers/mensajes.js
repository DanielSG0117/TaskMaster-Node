require('colors');

const mostrarMenu = () => {

    return new Promise((resolve, reject) => {
        console.clear();
        console.log('======================'.green)
        console.log('Selecciones una opción'.green)
        console.log('======================\n'.green)

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tarea `);
        console.log(`${'3.'.green} Listar tarea completadas`);
        console.log(`${'4.'.green} Listara tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green}  Borrar tare`);
        console.log(`${'0.'.green} Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Selecciones una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })

    });

}

const pausa = () => {

    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question(`\nPresiones ${'ENTER'.green} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })    
        
    });
   
}

module.exports = {
    mostrarMenu,
    pausa
}