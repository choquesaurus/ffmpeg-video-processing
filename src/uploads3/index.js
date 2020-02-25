import {S3} from 'aws-sdk';
import {join} from 'path';
import {readFile} from 'fs';
require('dotenv').config();
const {accessKeyId,secretAccessKey,Bucket} = process.env;
const s3 = new S3({
    //Access Token del usuario IAM
    accessKeyId,
    secretAccessKey,
    region:'us-east-2'
    //signatureVersion:'v4'
});
function UploadFiles(/*PARAMS  ARGUMENTS*/){
    console.log('Upload s3 ...');    
    let contador=0;
    return new Promise((resolve,reject)=>{
        [...arguments].forEach(element=>{
            readFile(join(__dirname,element),(err,data)=>{
                s3.putObject({
                    Bucket,
                    Key:element.replace(/.*(miniatura|unidos)./,""),/*videoconcat.mp4 | poster.png ----> keys :D*/
                    Body:data
                },(err,data)=>{
                    if(err)console.log(err)
                    console.log(`Subiendo a aws S3 el archivo ${element}`)
                                if(contador == [...arguments].length-1){
                                    console.log('urls de los archivos subidos a aws S3 ',[
                                        "https://bucket000upload.s3.us-east-2.amazonaws.com/videoconcat.mp4",
                                        "https://bucket000upload.s3.us-east-2.amazonaws.com/poster.png"
                                    ]);
                                    resolve([
                                        "https://bucket000upload.s3.us-east-2.amazonaws.com/videoconcat.mp4",
                                        "https://bucket000upload.s3.us-east-2.amazonaws.com/poster.png"
                                    ]);
                                }
                                contador++;
                })
            })
        })
    })
   
}

export default UploadFiles;
