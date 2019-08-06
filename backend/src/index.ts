import { createServer } from "http";
import app from './application';
import { sequelize } from './database/sequelize'

const port = process.env.PORT || 8000;

(async () => {
  await sequelize.authenticate();

  createServer(app).listen(port, () =>
    console.log(`Server started at http://localhost:${port}`)
  )
})();
