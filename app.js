const express = require ('express')
const bd= require('body-parser')
const cors=require('cors')
const mongoose= require('mongoose')
const db=require('./db')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = require ('./routes/users')
const supplier = require ('./routes/supplier')
const customer = require ('./routes/customer')
const product = require ('./routes/product')
const purchase = require ('./routes/purchase')
const sales = require ('./routes/sales')
const expenses = require ('./routes/expenses')
const reports = require ('./routes/reports')
const mailer= require('nodemailer')
const key='Puja Pandey'

const app=express();
app.use(cors());
app.use(bd.urlencoded({ extended: false }))
app.use(bd.json());


try{
    mongoose.connect("mongodb://127.0.0.1/HospitalApp")
    console.log("connection successfull")
}
catch(error){
    console.log(error);
}



// app.use(async(req,res,next)=>{
//     if(req.path=='/User/login' || req.path=='/User/ForgetPassword'){
//         next();
//     }
//     else{
//     const {userid,authorization}=req.headers;
    
//     const token = authorization && authorization.split(' ')[1];
    
//     try {
//         const data=await db.user.find({user_code:parseInt(userid)})
//         console.log(data)
        
//         if(data.length==0){
//             return res.status(401).json({ message: 'data not found'});
//         }
//         else{
//             if (!token) {
//                 return res.status(401).json({ message: 'Unauthorized' });
//               }
            
//               jwt.verify(token, key, (err, user) => {
//                 if (err) {
//                   return res.status(403).json({ message: 'Forbidden' });
//                 }
                
//                 const compare=bcrypt.compare(user.password,data[0].password);
                
//                 if(data[0].email==user.email && compare && data[0].user_code==user.user_code){
//                     next();
//                 }
//                 else{
//                     return res.status(403).json({ message: 'Forbidden' });
//                 }
                
                
//               });
            
//         }
//     } catch (error) {
        
//     }    
// }
// })

app.use('/User',users)
app.use('/Supplier',supplier)
app.use('/customer',customer)
app.use('/Product',product)
app.use('/purchase',purchase)
app.use('/sales',sales)
 app.use('/expense',expenses)
// app.use('/report',reports)

app.listen(3000)