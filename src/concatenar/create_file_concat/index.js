import fs from 'fs';
function CreateFile(params){
    return new Promise((resolve,reject)=>{
        let data="",escribir;
       
        escribir=fs.createWriteStream('./src/concatenar/file.txt');
        params.forEach(element=>{
            data+=`file '${element}'\n`
        })
        escribir.write(data,(err)=>{
            console.log(`Se creo el archivo de concatenacion con contenido:  \n${data}`);
            if(err)console.log(err)
            resolve("file_created");
        });
      
    })
}

export default CreateFile;