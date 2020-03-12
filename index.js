'use strict'

const express = require('express')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const Product = require('./modelos/product')

const app = express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.get('/api/product',(req,res)=>{
    Product.find({}, (err,products) =>{

        res.send(200, {products})
    })
})

// ------------------------------ CREAR PRUDUCTOS ------------------------------ //

app.post('/api/product',(req,res)=>{

    let product = new Product()

    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description


    product.save((err,productStore)=>{

        if(err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({product:productStore})
    }) 

  
})

// ------------------------------ ------------------------------ //



// ------------------------------ ELIMINAR PRUDUCTOS ------------------------------ //

app.delete('/api/product/:productId',(req,res)=>{

    let ProductId = req.params.productId
    let product = new Product()

    Product.findById(ProductId, (err,product)=>{

        if(err) res.status(500).send({message : `Error al eliminar el producto: ${err}`})

        product.remove(err =>{
            if(err) res.status(500).send({message : `Error al eliminar el producto: ${err}`})
            res.status(200).send({message: `El producto  ${product.name} ha  sido eliminado`})
        })

    })
})

// ------------------------------ ------------------------------ //





// ------------------------------ MOSTRAR PRUDUCTOS ------------------------------ //

app.get('/api/product/:productId',(req,res)=>{

    
    let ProductId = req.params.productId
    Product.findById(ProductId,(err,product)=>{

        if(err) return res.status(500).send({message: 'Error al realizar la peticion'})
        if(!product) return res.status(400).send({message: 'Error el producto no existe'})

        res.status(200).send({product})
    })

   
})

// ------------------------------ ------------------------------ //




// ------------------------------ ACTUALIZAR PRUDUCTOS ------------------------------ //

app.put('/api/product/:productId', (req,res) =>{

    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) =>{
        if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

        res.status(200).send({ product: productUpdate})
    })

})

// ------------------------------ ------------------------------ //


mongoose.connect('mongodb+srv://javierdlr00:alejandra96@cluster0-m5spm.mongodb.net/test?retryWrites=true&w=majority',(err,res) =>{
 
    if(err) throw err
    console.log('Conexion establecida')

    app.listen(3000,()=>{

        console.log("Esta corriendo en puerto 3000")
    })
    

})


