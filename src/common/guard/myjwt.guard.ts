/* eslint-disable prettier/prettier */
import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class MyJwtGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization; // Lấy token từ header
      
      // Log token để kiểm tra
    //   console.log('Received token:', token);
  
      return super.canActivate(context);
    }
  }
  