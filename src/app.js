import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import {Server} from "socket.io"
import fs from 'fs';


const app = express();
const httpSeerver = app.listen(8080, () => {
    console.log("Server Corriendo en: http://localhost:8080/");
});
const io = new Server(httpSeerver);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);  


try {
    
    
   /* app.get('/products', async (req, res) => {

       
        const {limit} =  req.query;
        console.log(prodManager.getProducts());
        
        if(typeof limit === "string" ){
            
            const resultado = await prodManager.getProducts();
            
            res.send(resultado);
        }else {

        }
        
        
    })*/


    io.on("connection", (socket) => {
        console.log("New client connected");
      });
    
} catch (error) {
    console.log(error);
}

export default io;
