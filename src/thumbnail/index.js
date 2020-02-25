import  fluent_ffmpeg from 'fluent-ffmpeg';
import path  from 'path';
function Thumbnail (params){
    return new Promise((resolve, reject)=>{
        fluent_ffmpeg(path.join(__dirname,params))
        .on('end',()=>{
            console.log('Se obtuvo la miniatura :D ../files/miniatura/poster.png')
            resolve('../files/miniatura/poster.png')
        })
        .screenshots({
            timestamps:['00:01:45'],
            filename:"poster.png",
            folder:path.join(__dirname,"../files/miniatura/"),
            size:"1280x720"
        })
    })
}

export default Thumbnail;