import { myDataSource } from "../datasource";
import { User } from "../entity/User";

export class UserService {
    async getAllUsers() {
        const userRepository = myDataSource.getRepository(User);
        return await userRepository.find();
    }
}