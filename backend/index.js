require("dotenv").config();
const app = require("./app");
const { welcomeNote } = require("./constant/constant");

app.listen(process.env.PORT || 8000, () => {
  console.log(welcomeNote);
});
