this is BE folder

download xampp
open MySQL admin and create a new database
CREATE DATABASE `ucpc_register`;
update the values in .env file
update the values in config/config.json file
run these commands
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm install
npm start
```
```