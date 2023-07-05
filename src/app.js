import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewRouter from './routes/view.router.js';
import { messageModel } from './dao/models/messages.model.js';
import { Server } from "socket.io"
import mongoose from 'mongoose';


const app = express();

const httpSeerver = app.listen(8080, () => {
    console.log("Server Corriendo en: http://localhost:8080/");
});
const io = new Server(httpSeerver);

const connection = mongoose.connect('mongodb+srv://UserHectorCenteno:li0Amcy4Vxr0TGxY@ecomerce.vknmwhs.mongodb.net/?retryWrites=true&w=majority');

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/view', viewRouter);



try {

    async function getLogs() {
        return await messageModel.find();
    }

    /* app.get('/products', async (req, res) => {
 
        
         const {limit} =  req.query;
         console.log(prodManager.getProducts());
         
         if(typeof limit === "string" ){
             
             const resultado = await prodManager.getProducts();
             
             res.send(resultado);
         }else {
 
         }
         
         
     })*/


    io.on("connection", async (socket) => {
        console.log("New client connected");
    

        const logs = await getLogs();

        io.emit("log", { logs });

        socket.on("message", async (data) => {
            await messageModel.create({ user: data.user, message: data.message });
            const logs = await getLogs();
            io.emit("log", { logs });
        });
        socket.on("userAuth", (data) => {
        socket.broadcast.emit("newUser", data);
        });
    });
} catch (error) {
    console.log(error);
}

export default io;
