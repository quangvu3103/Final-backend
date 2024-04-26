/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { authSevice } from "./auth.service";
import { AuthDTO } from "./dto";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { RegisterDTO } from "./dto/reigister.dto";
import { ResetDTO } from "./dto/reset.dto";
import { TokenDTO } from "./dto/token.dto";
import { ContentDTO } from "./dto/sendfeedback.dto";
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: authSevice){

    }
    @Post("register")
    async register(@Body() body: RegisterDTO) {
        return this.authService.register(body);
    }
    @Post("login")
    async login(@Body() authDto: AuthDTO){
        return this.authService.login(authDto);
    }

    @Post('reset')
    async reset(@Body() reset: ResetDTO){
        return this.authService.resetPassword(reset.email)
    }

    @Post('sendFeedback')
    async sendFeedback(@Body() reset: ContentDTO){
        return this.authService.sendFeedback(reset.content)
    }

    @Post('login-google')
    async loginByGoogle(@Body() token: TokenDTO): Promise<any> {
      const ticket = await this.authService.loginGoogle(token.token);
      return ticket;
    }
}