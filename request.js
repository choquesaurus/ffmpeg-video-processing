const ffmpeg=require('ffmpeg');

new ffmpeg('./files/descargados/1.mp4')
.then(video=>{
    video.setVideoBitRate(1024)
    .save('videos.mp4')
})