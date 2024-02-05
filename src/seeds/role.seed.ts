import dbConnection from '../db/connection';
import { RoleEnum, RoleSlugEnum } from '../enum/user';
import { Role } from '../models/role.model';
dbConnection();

const runSeed = async () => {
  try {
    const RoleData = [
      {
        name: RoleEnum.Admin,
        slug: RoleSlugEnum.Admin,
      },
      {
        name: RoleEnum.Company,
        slug: RoleSlugEnum.Company,
      },
      {
        name: RoleEnum.Staff,
        slug: RoleSlugEnum.Staff,
      },
      {
        name: RoleEnum.Worker,
        slug: RoleSlugEnum.Worker,
      },
    ];
    await Role.insertMany(RoleData, { ordered: false });
  } catch (error) {
    // console.log(error) // -> MongoError: write operation failed
  }
};

runSeed();
