require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/database/connectDB");


const startServer = async () => {
    try{
        await connectDB();
        const port = process.env.PORT;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });      
    }catch(error){
            console.error(`Error starting server: ${error.message}`);
            process.exit(1);
        }
};

startServer();
