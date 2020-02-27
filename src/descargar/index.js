import fs from 'fs';
import youtubedl from 'youtube-dl';
import path from 'path';
const Descargar=params=>{
    let video,write,arr;
    return new Promise((resolve,reject)=>{
        params.forEach((url,i) => {
            video= youtubedl(url);
            write=fs.createWriteStream(path.join(__dirname,`../files/descargados/${i}.mp4`));
            video.pipe(write);

        });
        video.on('end',()=>{
            fs.readdir(path.join(__dirname,'../files/descargados'),(err,files)=>{
                //resolve(files.filter(value=>path.extname(value)=='.mp4'))
                const filetermp4=files.filter(e=>path.extname(e)=='.mp4');
                const paths=filetermp4.map(e=>`../files/descargados/${e}`);
                
                resolve(paths);
                //resolve(files.filter(e=>path.extname(e)=='.mp4').map(v=>))
                //resolve(files.map((value,i)=>path.extname(value)=='.mp4'?`../files/descargados/${value}`:i++))
            })
            console.log('finish downloading');
            // resolve([
            //     "../files/descargados/0.mp4",
            //     "../files/descargados/1.mp4",
            //     "../files/descargados/2.mp4",
            //     "../files/descargados/3.mp4",
            //     "../files/descargados/4.mp4",
            //     "../files/descargados/5.mp4"
            // ]);
           //upload([0,1,2,3],resolve);
        }) 
    })    
 }
 
 export default Descargar;