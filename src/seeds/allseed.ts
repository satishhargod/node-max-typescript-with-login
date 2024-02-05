import { execSync } from 'child_process';
import { config } from 'dotenv';
import dbConnection from '../db/connection';
 config();
const runAllSeed = async ()=>{
  await dbConnection();
  // console.log("dbconnected", dbconnected)
  (async function () {
     // List of seed files in the desired execution order
    const seedFiles = ['src/seeds/role.seed.ts', 'src/seeds/admin.seed.ts'];
  
    seedFiles.forEach((seedFile) => {
      try {
        console.log(`Running seed file: ${seedFile}`);
        execSync(`ts-node ${seedFile}`, { stdio: 'inherit' });
      } catch (error: any) {
        console.error(`Error running seed file: ${seedFile}`);
        console.error(error.message);
        // process.exit(1);
      }
    });
  })()
    .catch((e) => console.error(e))
    .finally(async () => {
      console.log('All seed run successfully');
    });
}

runAllSeed()