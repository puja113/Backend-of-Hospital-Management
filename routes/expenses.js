const express=require('express');
const router=express.Router();
const db=require('../db')




router.get('/GetAllExpenses',async(req,res)=>{
    var mydata=[];
    try{
        const data= await db.Expense.find({is_deleted:false});
         
        for(let i=0;i<data.length;i++){
            var obj={expenseId:data[i]._id,expenseCategoryId:data[i].expense_cat_id_fk,amount:data[i].amount,date:data[i].date,expenseNote:data[i].note}
            mydata.push(obj);

        }
        res.status(200).json({status:true, data:mydata})
    }
    catch(error){
        console.log(error);
    }
})
router.get('/GetExpensesById',async(req,res)=>{
    const {userid,authentication}=req.headers;
    const {expenseId}=req.body;
    try{
        const data= await db.Expense.find({_id:expenseId})
        var obj={expenseId:data[0]._id,expenseCategoryId:data[0].expense_cat_id_fk,amount:data[0].amount,date:data[0].date,expenseNote:data[0].note}
        res.status(200).json({status:true,data:obj})
    }
    catch(error){

    }
   
   

})
router.post('/AddExpenses', async (req, res) => {
    console.log(req.body)
    const date= new Date(req.body.date)
    const {expenseCategoryId,amount,expenseNote}=req.body;
    const {userid,authentication}=req.headers;
    try { 
        const data=await db.Expense.create({expense_cat_id_fk:expenseCategoryId,amount:amount,date:date,note:expenseNote,created_by:parseInt(userid),created_at:Date.now()})
        res.status(200).json({status:true, data:data})
    } catch (error) {
        console.log(error)
    }
}) 
  
 
router.put('/UpdateExpenses',async(req,res)=>{
    const date= new Date(req.body.date)
    const {expenseCategoryId,amount,expenseNote,expenseId}=req.body;
    const {userid,authentication}=req.headers;
    try {
        const data= await db.Expense.updateOne({_id:expenseId},{expense_cat_id_fk:expenseCategoryId,amount:amount,date:date,note:expenseNote,created_by:parseInt(userid),created_at:Date.now()})
        res.status(200).json({status:true,data:data})
    } catch (error) {
        
    }

})
router.delete('/DeleteExpenses', async(req,res)=>{
    const {expenseId}=req.body;
    const {userid,authentication}=req.headers;
    try {
        const data= await db.Expense.updateOne({_id:expenseId},{is_Deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
        res.status(200).json({status:true,data:data})
    } catch (error) {
        console.log(error)
    }
})



router.get('/GetAllCategory', async(req,res)=>{
    var mydata=[];
    try{
        const data= await db.ExpenseCategory.find({is_deleted:false });
         
        for(let i=0;i<data.length;i++){
            var obj={CategoryName:data[i].category_name,description:data[i].description,expenseCategoryId:data[i]._id}
            mydata.push(obj);

        }
        res.status(200).json({status:true, data:mydata})
    }
    catch(error){
        console.log(error);
    }
})
router.get('/GetCategoryById',async(req,res)=>{
    const Id=req.body.expenseCategoryId
    try{
     const data= await db.ExpenseCategory.find({_id: Id})
     var obj = {CategoryName:data[0].category_name,description:data[0].description,expenseCategoryId:data[0]._id}
     
     res.status(200).json({status:true, data:obj})
    }
    catch(error){
     console.log(error)
    }
})
router.post('/AddCategory', async (req, res) => {
    const {CategoryName,description}=req.body;
    const {userid,authentication}=req.headers;
    try {
        const data=await db.ExpenseCategory.create({category_name:CategoryName,description:description,created_by:parseInt(userid),created_at:Date.now()});
        res.status(200).json({status:true, data:data})
    } catch (error) {
        
    }
}) 
  
 
router.put('/UpdateCategory', async(req,res)=>{
    const {CategoryName,description,expenseCategoryId}=req.body;
    const {userid,authentication}=req.headers;
    try {
        const data=await db.ExpenseCategory.updateOne({_id:expenseCategoryId},{category_name:CategoryName,description:description,updated_by:parseInt(userid),updated_at:Date.now()});
        res.status(200).json({status:true, data:data})
    } catch (error) {
        
    }

})
router.delete('/DeleteCategory', async(req,res)=>{
    const {expenseCategoryId}=req.body;
    const {userid,authentication}=req.headers;
    try {
        const data=await db.ExpenseCategory.updateOne({_id:expenseCategoryId},{is_Deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()});
        res.status(200).json({status:true, data:data})
    } catch (error) {
        
    }
})

module.exports=router;