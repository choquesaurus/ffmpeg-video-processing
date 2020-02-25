// //import fluent_ffmpef from 'fluent-ffmpeg';
// const fluent_ffmpef=require('fluent-ffmpeg');
// const path=require('path');
// //import path from 'path'
// function Unir(){
//     console.log('1')
//     //console.log('Merge ',params);
//    //const [ruta1,ruta2,ruta3,ruta4]=params;
//     return new Promise((resolve,reject)=>{
//         console.log('2')
//         fluent_ffmpef()
//         .input('../files/cortados/0.mp4')
//         .input('../files/cortados/1.mp4')
//         // .input('../files/cortados/2.mp4')
//         // .input('../files/cortados/3.mp4')
        
//         .on('end',()=>{
//             console.log('Se termino de unir');
//             //resolve(path.join(__dirname,'../files/unidos/video.mp4'));
//             console.log('3')
//             resolve('merge completo :D');
//         })
//         .mergeToFile('../files/unidos/video.mp4','../reply')
//     })
// }
// //export default Unir;
// async function ini(){
//     const data=await Unir();
//     console.log(data);
// }
// ini();

// import {exec} from 'promisify-child-process';

// import path from 'path';
// function Unir(params){
//     console.log('1')
//     //console.log('Merge ',params);
//     //const [ruta1,ruta2,ruta3,ruta4]=params;
//     console.log("sector concatenar",params)
//     return new Promise(async(resolve,reject)=>{
//          const {stdout} = await exec(`ffmpeg -f concat -safe 0 -i ${__dirname,'../files/unidos/file.txt'}  -c copy ${__dirname,'../files/unidos/video.mp4'}`)
//         console.log(stdout);
//         resolve('../files/unidos/video.mp4');
//         })
// }
// export default Unir;
import {execFile,spawn,exec} from 'promisify-child-process';
import CreateFile from './create_file_concat/index';
//const fs=require('fs');
function Unir(params){

        console.log('Archivos a concatenar  :D  ',params);       
       return new Promise(async (resolve,reject)=>{
        try {
                
                 await CreateFile(params);
                const {stderr,stdout} =await exec('ffmpeg -f concat -safe 0 -i ./src/concatenar/file.txt  -c copy ./src/files/unidos/videoconcat.mp4');
                console.log('Archivo concatenado correctamente :D')
                console.log('Ruta del video concatenado ../files/unidos/videoconcat.mp4')
                resolve('../files/unidos/videoconcat.mp4');
                 
                
                
        } catch (error) {
               reject(error); 
        }
     
       
    })
       //const data =await spawn('dir',{encoding:'utf-8'})
        // const file=fs.createWriteStream('file.txt');
        // file.write(stdout);       
        // fs.writeFile('file.txt',stdout.toString(),{encoding:'utf-8'},(err)=>{
        //     if(err)console.log(err)
        //     console.log(stdout)
        // });
        
        //stdout.write()
        
   
}
export default Unir;
//module.exports=Unir;
//Unir().then(data=>console.log(data))
