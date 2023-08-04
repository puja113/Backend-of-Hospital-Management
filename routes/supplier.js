const express=require('express');
const router=express.Router();
const db=require('../db')




router.get('/GetAllSuppliers',async(req,res)=>{
    var mydata=[];
    try{
        const data= await db.supplier.find({is_deleted:false });
         
        for(let i=0;i<data.length;i++){
            var obj={supplierId:data[i]._id,name:data[i].name,supplierCode:data[i].supplier_code,contactNo_1: data[i].contact_no_1,contactNo_2:data[i].contactNo_2,contactNo_3:data[i].contact_no_3}
            mydata.push(obj);

        }
        res.status(200).json({status:true, data:mydata})
    }
    catch(error){
        console.log(error);
    }
})
router.get('/GetSupplierById',async(req,res)=>{
   const supplierId=req.body.supplierId
   try{
    const data= await db.supplier.find({_id: supplierId})
    var obj = {supplierId:data[0]._id,name:data[0].name,supplierCode:data[0].supplier_code,contactNo_1: data[0].contact_no_1,contactNo_2:data[0].contactNo_2,contactNo_3:data[0].contact_no_3}
    console.log(data[0]._id)
    res.status(200).json({status:true, data:obj})
   }
   catch(error){
    console.log(error)
   }
   
   

})
router.post('/AddSupplier', async (req, res) => {
    const { name, contactNo_1, contactNo_2, contactNo_3, supplierCode, address } = req.body
    const { userid, authentication } = req.headers
    try {
      const data = await db.supplier.create({ 
        name: name, 
        supplier_code: supplierCode, 
        address: address, 
        contact_no_1: contactNo_1, 
        contact_no_2: contactNo_2, 
        contact_no_3: contactNo_3, 
        created_by: parseInt(userid), 
        created_at: Date.now() 
      });
      res.status(200).json({ status: true, data: data });
    } 
    catch (error)
    {
      console.log(error)
    }
  }) 
  
 
router.put('/UpdateSupplier',async(req,res)=>{
    const{ name, contactNo_1, contactNo_2, contactNo_3, supplierCode, address,supplierId}=req.body
    const{userid,authentication}=req.headers
    try{
        const data = await db.supplier.updateOne(
            {_id:supplierId},
            { 
            name:name, 
            contact_no_1:contactNo_1,
            contact_no_1:contactNo_2, 
            contact_no_1:contactNo_3, 
            supplier_code:supplierCode,
            address:address,
            updated_by: parseInt(userid),
            updated_at:Date.now()
        });
        res.status(200).json({status:true,data:data})
    }
    catch(error){
        console.log(error)
    }



})
router.delete('/DeleteSupplier', async(req,res)=>{
    console.log(1)
    const _id=req.body.supplierId
    const deleted_by=req.headers.userid; 
    try{
        const data=await db.supplier.updateOne({_id:_id},{
            is_deleted:true,deleted_by:parseInt(deleted_by),deleted_at:Date.now()
        });
        res.status(200).json({status:true,data:data})
    }
    catch(error){
        console.log(error);
    }
})

module.exports=router;