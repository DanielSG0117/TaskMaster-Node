require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorra, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () =>{


    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){ //Cargar tareas
        tareas.cargarTareaFromArray(tareasDB);
    }

    do {
        //Aqui se imprime el menu al llamar a la funcion iquirerMenu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //Se manda a llamar a la funcion leerInput y se le manda como paramatro el mensaje 'Descripcion'
                const desc = await leerInput('Descripccion: ');
                //Se manda a llamara a la funcion creaTarea y se le manda la descipcion definida en la funcion leerInput
                tareas.creaTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;
                
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
        
            case '5':// completadoo | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
   
            case '6': //Borrar
                const id =  await listadoTareasBorra(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?')
                    //TODO: preguntar si esta seguro
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
            break;
 
                
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa()

    }while(opt !='0' );
    
    //pausa();
}


main();