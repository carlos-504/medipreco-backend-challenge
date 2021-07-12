import express from 'express';
import db from './src/models';
import routes from './src/routes';
import { createStrikers } from './src/seeders/strikers';
import { createTournament } from './src/seeders/tournament';

const app = express();
const port = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then((): void => {
    createStrikers();
    createTournament();
    routes(app);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err: Error): void => console.log(err));
