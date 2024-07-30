this is BE folder

# UCPC Register
## How to run the project (docker)
- Fill in the .env file with the correct values
- If you have make installed

```
cd Backend
make up-dev
make migrate

```
### If you don't have make installed

```
cd Backend 
docker-compose -f docker-compose.dev.yml up -d

npm i sequelize-cli
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

```

## How to run the project (not docker)
```
connect to a DB
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