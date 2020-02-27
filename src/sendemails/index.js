require('dotenv').config();
import mailer from 'nodemailer';
const {user,pass}=process.env;
function SendMails(){
const [urlsFilesS3,sendmailers]=[...arguments];
const [pathThumbnail,pathVideo]=urlsFilesS3;

console.log('Enviando archivos y mensaje a estos correos : ',sendmailers)
console.log('Enviando Video y miniatura a los correos seleccionados :D ');
console.log('Enviando . . .');
const transporter= mailer.createTransport({
        service:"gmail",
        auth:{
            user,
            pass
        }       
    });
    return new Promise((resolve,reject)=>{
        transporter.sendMail({
            from: `Dani :D <${user}>`, // Correo remitente :D
            to: sendmailers, // lista de destinatarios
            subject: "Ejemplo del reto", // Asunto :D
            html:`
            <h4>Buenas Noches :D<h4/>
            <h4>Tabla de rutas de los archivos procesados<h4/>
            <table>
            <thead>
              <tr>
                <th>Url miniatura</th>
                <th>Url video</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${pathThumbnail}</td>
                <td>${pathVideo}</td>
              </tr>
            </tbody>
          </table>
           <br/>  
           <h4>Miniatura : </h4><br/> 
           <img src=${pathThumbnail} style="width:200px;"/><br/><br/>
            <h4>Copia y pega este codigo en un archivo HTML , agrega (<) y cierra la etiquera (/>)></h4><br/>
            
            <span>
            video   <br/>
            src='${pathVideo}'<br/>
            poster='${pathThumbnail}'<br/>
            controls 
            </span>  
            
           
            <br/><br/>
           <span>Cualquier consulta : daniechoque159@gmail.com<span/><br/>
           <span>Repositorio del ejemplo : <span/><a href='https://github.com/WasauskyOK/ffmpeg-video-processing'>Ir al repositorio :D</a><br/><br/>
           <h4>Adios :D<h4/>
            `
            // ,
            // attachments:[{
            //     filename:"videasoxd.mp4",
            //     path:pathVideo
            //   },
            //   {
            //     filename:"imagenminiatura.png",
            //     path:pathThumbnail
            //   }]
        },(err,info)=>{
            if(err)console.log(err)
            console.log('Enviado :D');     
            console.log("Caracteristicas del emails enviado",info)
            resolve(`Compañeros : ${sendmailers.join(' - ')} , Revisen sus bandejas de entradas :D `)
        })
    })
}
export default SendMails;