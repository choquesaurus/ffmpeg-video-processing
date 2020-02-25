import Descargar from './descargar/index';
import Cortar from './cortar/index';
import Unir from  './concatenar/index';
import Thumbnail from './thumbnail/index';
import UploadFiles from './uploads3/index';
import SendMails from './sendemails/index';

require('dotenv').config();
//import Correos from './utils/index';
const correos=process.env.correos.split(',');
const urls=
['https://www.youtube.com/watch?v=q0hyYWKXF0Q',
'https://www.youtube.com/watch?v=fSW44nXR2Hk',   
'https://www.youtube.com/watch?v=nQ7mhC5_Rys',
'https://www.youtube.com/watch?v=QH2-TGUlwu4',
'https://www.youtube.com/watch?v=VRUjdlCynU0',
'https://www.youtube.com/watch?v=7q1HnqDB0nM'
]

async function initProcess(params,emails){
    try {
    const urlsdescargar=await Descargar(params);
    const urlscortados=await Cortar(urlsdescargar);
    const urlsunido= await Unir(urlscortados);
    const urlsminiatura=await Thumbnail(urlsunido);
    const urlsuploads3=await UploadFiles(urlsunido,urlsminiatura);
    const sendmails=await SendMails(urlsuploads3,emails);
    
    console.log(sendmails);
    } catch (error) {
        console.log(error)
    }
}
initProcess(urls,correos)