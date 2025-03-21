import * as homeController from "./controllers/homeControllers.js";
import * as loginController from "./controllers/loginControllers.js";
import * as newproductController from "./controllers/newproductControllers.js";
import * as sessionManager from "./lib/sessionManager.js";
import connectMongoose from "./lib/connectMongoose.js";
import express from "express";
import createError from "http-errors";
import logger from "morgan";

await connectMongoose();
console.log("Conectado a MongoDB.");

const app = express();

app.locals.appName = "NodeApp";

app.set("views", "views"); // views folder
app.set("view engine", "ejs");

app.use(logger("dev")); //morgan
app.use(express.json()); // parsear el body que venga en formato JSON
app.use(express.urlencoded({ extended: false })); // parsear el body que venga urlencoded (formularios)
app.use(express.static("public"));

/**
 * Aplication Routes
 */

app.use(sessionManager.middleware, sessionManager.useSessionInViews);

app.get("/", homeController.index);
app.get("/login", loginController.index);
app.post("/login", loginController.postLogin);
app.all("/logout", loginController.logout);

// private page
app.get("/newproduct", sessionManager.guard, newproductController.index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // validation errors
  if (err.array) {
    err.message =
      "Invalid request: " +
      err
        .array()
        .map((e) => `${e.location} ${e.type} ${e.path} ${e.msg}`)
        .join(", ");
    err.status = 422;
  }

  res.status(err.status || 500);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODEAPP_ENV === "development" ? err : {};

  // render error view
  res.render("error");
});

export default app;
