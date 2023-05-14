import express, {Application} from 'express';
import bodyParser from 'body-parser';

import {router} from './routes';

const app: Application = express();

const PORT = 3001;

app.use(bodyParser.json());
app.use('/', router);

app.listen(PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', PORT);
});


// TODO:
// - Add Loggers and error handling
// - Add custom format response
// - Add Error handling to Seeders
// - Add Readme
// - Add docs to README.md with examples
//
