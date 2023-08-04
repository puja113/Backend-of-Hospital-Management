const express=require('express');
const router=express.Router();
const db=require('../db');

router.get("/GetAllReports",async(req,res)=>{
    var myData=[];
    try {
        const data=await db.Product.find({is_deleted:false});
        
        for(let i=0;i<data[i].length;i++){
            const data1=await db.Brand.find({product_id_fk:data[i]._id})
            var obj={
                productId:data[i]._id,
                currentStock:data[i].quantity,
                productName:data[i].product_name,
                pack_of: data1[i].packOf,
                mrp_per_pack: data1[i].mrpPerPack,
            }
            myData.push(obj)
        }
        res.status(200).json({status:true,data:myData})
    } catch (error) {
        
    }
})


module.exports=router;