import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("doe-project", "postgres", " ", {
  host: "localhost",
  dialect: "postgres",
});


sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });