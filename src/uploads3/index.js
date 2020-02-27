import {S3} from 'aws-sdk';
import {join} from 'path';
import {readFile} from 'fs';
require('dotenv').config();
const {accessKeyId,secretAccessKey,Bucket,region} = process.env;
const s3 = new S3({
    //Access Token del usuario IAM
    accessKeyId,
    secretAccessKey,
    region
    //signatureVersion:'v4'
});
function UploadFiles(/*PARAMS  ARGUMENTS*/){
    console.log('Upload s3 ...');    
    let contador=0,array=[],links3;
    return new Promise((resolve,reject)=>{
        [...arguments].forEach(element=>{
            readFile(join(__dirname,element),(err,data)=>{
                s3.putObject({
                    Bucket,
                    Key:element.replace(/.*(miniatura|unidos)./,""),/*videoconcat.mp4 | poster.png ----> keys :D*/
                    Body:data
                },(err,data)=>{
                    // var params = {Bucket, Key:element.replace(/.*(miniatura|unidos)./,"")};
                    // s3.getSignedUrl('getObejct',params)
                    console.log(`Subiendo a aws S3 el archivo ${element}`)
                    let key=element.replace(/.*(miniatura|unidos)./,"");
                    s3.getSignedUrl('getObject',{
                        Key:key,
                        Bucket
                    },(err,data)=>{
                        if(err)console.log(err)
                        array.push(data.split("?")[0])

                        if(contador == [...arguments].length-1){
                            console.log('urls de los archivos subidos a aws S3 ',array);
                            resolve(array);
                        }
                        contador++;
                    })
                    if(err)console.log(err)
                    
                    console.log(data.ETag);
                               
                })
            })
        })
    })
   
}

export default UploadFiles;
