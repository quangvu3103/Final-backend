/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { S3Service } from "src/provide/s3/s3.service";


@Injectable({


})
export class FileService {
    constructor(
            private s3Serivce: S3Service

        ){

    }
    async upload(file: any) {
        return await this.s3Serivce.uploadFile(file, 'avatar/test/');
    }

}