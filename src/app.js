import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import fs from 'fs';



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


    app.listen(8080, () => console.log('Server Corriendo en: http://localhost:8080/'));
    
} catch (error) {
    console.log(error);
}
