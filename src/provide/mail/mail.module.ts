/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [MailerModule.forRoot({
    transport:{
        host:'smtp.elasticemail.com',
        port: 2525,
        secure: false,
        auth: {
          user: 'vunqgcd191153@fpt.edu.vn',
          pass: '6F19FA80F9029DAEE222651E235966514329',
        },
    }
  })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}


