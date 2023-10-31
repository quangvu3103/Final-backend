import  {Module} from "@nestjs/common"
import { ProductController } from "./product.controller";
import { ProductService } from "./product.sevice";

@Module({
    imports:[],
    controllers:[ProductController],
    providers: [ProductService],
})

export class ProductModule{}