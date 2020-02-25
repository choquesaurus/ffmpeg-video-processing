import ffmpeg from 'ffmpeg';
import path from 'path';
function Cortar(params){
    console.log("Archivos a cortar  ",params);
    let process,arr=[],contador=0;
    return new Promise((resolve,reject)=>{
      params.forEach((element,i)=>{
        process=new ffmpeg(path.join(__dirname,element),(err,video)=>{
          if(err)console.log(err)
          video.setVideoSize("1280x720");
          console.log(`Se establecio el tamaño del video a 1280x720 ${element}`)
          video.setDisableAudio();
          console.log(`Se deshabilito el audio del video  ${element}`)
          //.addCommand("-c copy -t 00:00:30")
          video.setVideoDuration('00:00:30');
          console.log(`Se  establece el limite de duracion de datos leidos del video  ${element}`)
          //video.setVideoBitRate(1073);
          video.setVideoFrameRate(25);
          console.log(`Se establece velocidad de fotogramas ( 25 ) por segundo del video  ${element}`)
          video.save(path.join(__dirname,`../files/cortados/${i}.mp4`),(err,file)=>{
          //video.save(path.join(__dirname,`../files/cortados/${i}.mp4`),(err,file)=>{
            if(err)console.log(err)  
            console.log(`Se recorto y guardo el archivo ${file}`);
            //arr.push(`../files/cortados/${i}.mp4`);
            arr=[...arr,`../files/cortados/${i}.mp4`];
            if(contador>=params.length-1){
              console.log('Ubicacion de archivos cortados :D ',arr);
                resolve(arr);
            }
            contador++;
          });        
        }); 
      })
    })
  }

  export default Cortar;