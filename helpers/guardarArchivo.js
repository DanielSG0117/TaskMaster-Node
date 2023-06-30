const fs = require('fs');

const archivo = './db/data.json'

const guardarDB = (data) =>{
    fs.writeFileSync(archivo, JSON.stringify(data) );//Con esta funcion padamaos nuestra objeto a un string
}


const leerDB = () =>{
    if(!fs.existsSync(archivo)){
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info)//con esto descerializa nuestro string para volverlo de nuevo a un objeto
    // console.log(data);
    return data;

}
module.exports = {
    guardarDB, 
    leerDB
}