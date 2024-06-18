require('dotenv').config();

const express = require('express');

const app = express();

const PORT=process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false}));


//routes
const adminRouter=require('./routers/admin.routes.js');
const productRouter=require('./routers/product.routes.js');
const brandRouter=require('./routers/brand.routes.js');
app.use('/api/admin',adminRouter);
app.use('/api/product',productRouter);
app.use('/api/brand',brandRouter);


app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})



