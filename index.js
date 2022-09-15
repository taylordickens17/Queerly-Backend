require("dotenv").config();

const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(require("./middleware/headers"));

app.use(Express.json());

app.use("/user", controllers.userController);
app.use(require("./middleware/validate-session"));
app.use("/experience", controllers.experienceController);
app.use("/business", controllers.businessController);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on 3000.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
