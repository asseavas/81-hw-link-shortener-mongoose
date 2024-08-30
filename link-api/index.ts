import express from 'express';
import cors from 'cors';
import config from './config';
import * as mongoose from 'mongoose';
import linksRouter from './routes/links';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());

const run = async () => {
  await mongoose.connect('mongodb://localhost/links');
  app.use('/', linksRouter);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
