import { Body, Controller, Post } from "@nestjs/common";
import { authSevice } from "./auth.service";
import { AuthDTO } from "./dto";
@Controller('auth')
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