const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setup Cross origin
app.use(require("cors")());
app.use("/chatroom", require("./routes/chatroom"));
app.use("/user", require("./routes/user"));

const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
app.use(errorHandlers.developmentErrors);

if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}
module.exports = app;