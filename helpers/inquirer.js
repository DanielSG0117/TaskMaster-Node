const inquier = require('inquirer');
const { default: Choice } = require('inquirer/lib/objects/choice');
require('colors');

//Se definene las opciones que tendra eñ menu mediante le uso de inquirer
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desae hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

//Se define una pausa para poder elegir una opcion
const pausa = async () => {

    const pregunta = [
        {
            type: 'input',
            name: 'Enter',
            message: `Presiones ${'ENTER'.green} para continuar`
        }
    ]

    console.log('\n')
    await inquier.prompt(pregunta);
}

//Esta funcion muestra el menu
const inquirerMenu = async () => {
    console.clear();
    console.log('======================'.green)
    console.log('Selecciones una opción'.white)
    console.log('======================\n'.green)
    //Se manda a llamar las preguntas usando iquirer
    const { opcion } = await inquier.prompt(preguntas)

    //retorna el valor de la opcion
    return opcion;
}

//con esta funcion el usaurio puede ingresar la descripcion de la tarea
const leerInput = async (mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquier.prompt(question);
    return desc;
}



const listadoTareasBorra = async( tareas= []) =>{

    const choices = tareas.map( (tarea, i) =>{
        const idx = `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green+ ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id', 
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquier.prompt(preguntas);
    return id;
}

const confirmar = async (message) =>{
    
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquier.prompt(question);
    return ok; 

}


const mostrarListadoChecklist = async( tareas= []) =>{

    const choices = tareas.map( (tarea, i) =>{
        const idx = `${i+1}.`.green;
        
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids', 
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquier.prompt(pregunta);
    return ids;
}
module.exports = {
    inquirerMenu,
    pausa,
    leerInput, 
    listadoTareasBorra,
    confirmar, 
    mostrarListadoChecklist
}