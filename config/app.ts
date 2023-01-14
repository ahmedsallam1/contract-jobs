import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from '../src/model';
import { getProfile } from '../web/middleware/getProfile';
import { router } from "../web/routes/index";

const app = express();


app.use(bodyParser.json());
app.use('/', getProfile, router);


app.set('sequelize', sequelize)
app.set('models', sequelize.models)

init();

async function init() {
  try {
    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

export {
  app
}