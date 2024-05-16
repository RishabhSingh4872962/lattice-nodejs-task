import app from "./src/app.js";

const port=process.env.PORT|| 8080;



function runServer() {
    app.listen(port,function(){
        console.log(`Server is running on ${port}`);
    })
}


runServer();
