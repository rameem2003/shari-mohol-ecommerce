require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT || 8000, () => {
  console.log({
    title: "Shari Mohol API",
    Owner: "Maksudur Rahman Rasel",
    developer: "ROL Studio Bangladesh",
    author: "Mahmood Hassan Rameem",
    server_ip: `http://localhost:${process.env.PORT}`,
  });
});
