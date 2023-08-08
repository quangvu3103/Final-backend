import  {Module} from "@nestjs/common"
import { PetAccessoriesController } from "./petAccessories.controller";
import { PetAccessoriesService } from "./petAccessories.service";


@Module({
    imports:[],
    controllers:[PetAccessoriesController],
    providers:[PetAccessoriesService],
})
export class PetAccessoriesModule{}