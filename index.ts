import express from 'express';
import db from './src/models';

const app = express();
const port = 3003;

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err: Error) => console.log(err));
