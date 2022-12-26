const express = require("express");
const cors = require("cors");
const {connectDB} =  require('../db/config')
class Server {
  usersPath = "/api/users";

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.connectionDB()
    this.middlewares();
    this.routes();
  }
  async connectionDB(){
    await connectDB()
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json())
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.usersPath, require('../router/user'));
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server listening on port ${this.PORT}`);
    });
  }
}

module.exports = Server;
