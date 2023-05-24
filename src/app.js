const express = require('express');
const fs = require('fs');
const productManager = require('./ProductManager');




const app = express();

app.use(express.urlencoded({ extended: true }));

const prodManager = new productManager();
    


try {
    
    
    app.get('/products', async (req, res) => {

       
        const {limit} =  req.query;
        console.log(prodManager.getProducts());
        
        if(typeof limit === "string" ){
            
            const resultado = await prodManager.getProducts();
            
            res.send(resultado);
        }else {

        }
        
        
    })
    app.listen(8080, () => console.log('On line'));
} catch (error) {
    console.log(error);
}
