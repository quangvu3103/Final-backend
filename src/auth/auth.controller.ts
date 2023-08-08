import { Body, Controller, Post } from "@nestjs/common";
import { authSevice } from "./auth.service";
import { AuthDTO } from "./dto";
import { ApiTags } from "@nestjs/swagger";
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: authSevice){

    }
    @Post("register")
    async register(@Body() body: AuthDTO) {
        return this.authService.register(body);
    }
    @Post("login")
    async login(@Body() authDto: AuthDTO){
        return this.authService.login(authDto);
    }
}