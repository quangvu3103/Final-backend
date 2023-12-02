/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Delete, Query, Param, UseGuards, Patch, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MyJwtGuard } from "src/common/guard";
import { FileService } from "./file.service";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


@Controller('file')
@ApiTags('File')
@ApiBearerAuth('Jwt-auth')

@UseGuards(MyJwtGuard)
export class FileController{
    constructor(
        private fileService : FileService,

    ){}
    
  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  @Post('/multiple-file-upload')
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string[]> {
    return await this.fileService.multiUpload(files);
  }

}