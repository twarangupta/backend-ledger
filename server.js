require("dotenv").config();
const app = require("./src/app");
const ConnectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await ConnectDB();
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    
  } catch (err) {
    console.log("error starting server", err);
    process.exit(1)
  }
}

startServer();
