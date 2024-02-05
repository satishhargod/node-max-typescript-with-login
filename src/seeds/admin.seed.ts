import dbConnection from '../db/connection';
import { RoleSlugEnum } from '../enum/user';
import { Role, User, UserRole } from '../models';
dbConnection();

const runSeed = async () => {
  try {
    const admin = {
      username: 'maxadmin',
      email: 'max@mailinator.com',
      password: 'Maxadmin@123',
      status: true,
    };
    const user = await User.create(admin);
    if(user){
      const role = await Role.findOne({slug: RoleSlugEnum.Admin});
      if(role){
        await UserRole.create({
          userId: user._id,
          roleId: role._id
        })
      }
     
    }
  } catch (error) {
    console.log(error); // -> MongoError: write operation failed
  }
};

runSeed();
