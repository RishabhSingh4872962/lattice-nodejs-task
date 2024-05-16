import { config } from "./src/Config/config.js";
import connectDB from "./src/Config/db.js";
import app from "./src/app.js";



async function runServer() {

    const port = config.port;
  await connectDB().catch(() => {
    process.exit(1);
  });

    app.listen(port,function(){
        console.log(`Server is running on ${port}`);
    })
}


runServer();
