const express=require('express');
const router=express.Router();
const db=require('../db')

//product

router.get('/GetProducts', async(req,res)=>{
    var my_data=[]
    
       try{
      
      const data=await db.Product.find({is_deleted:false})
      for(let i=0;i<data.length;i++){
          var obj={productName:data[i].product_name,brandId:data[i].brand_id_fk,productCategoryId:data[i].product_category_id_fk,alertQuantity:data[i].alert_quantity,sequenceSorting:data[i].sequence_sorting,discountPercent:data[i].discount_percent,customField_1:data[i].custom_field_1,customField_2:data[i].custom_field_2,customField_3:data[i].custom_field_3}
          my_data.push(obj);

      }res.status(200).json({status:true,data:my_data})
    }catch(error){
    console.log(error)
   }
})
router.get('/GetProductById',async(req,res)=>{
    const {productId}=req.body.productId
    
   try {
    const data=await db.Product.find({_id:productId})
    var obj={productName:data[0].product_name,brandId:data[0].brand_id_fk,productCategoryId:data[0].product_category_id_fk,alertQuantity:data[0].alert_quantity,sequenceSorting:data[0].sequence_sorting,discountPercent:data[0].discount_percent,customField_1:data[0].custom_field_1,customField_2:data[0].custom_field_2,customField_3:data[0].custom_field_3}
    res.status(200).json({status:true,data:obj})
} catch (error) {
    
   }
})
router.post('/AddProduct', async (req, res) => {
    
    const {productName,brandId,productCategoryId,alertQuantity,sequenceSorting,discountPercent,customField_1,customField_2,customField_3,quantity}=req.body;
    const{userid}=req.headers
    console.log(req.body)
    try {
        const data=await db.Product.create({product_name:productName,brand_id_fk:brandId,product_category_id_fk:productCategoryId,quantity:quantity,alert_quantity:alertQuantity,sequence_sorting:sequenceSorting,discount_percent:discountPercent,custom_field_1:customField_1,custom_field_2:customField_2,custom_field_3:customField_3,created_by:parseInt(userid),created_at:Date.now()});
        res.status(200).json({status:true,data:data})
    } catch (error) {
      console.log(error)
        res.status(404).json({status:false,data:null})
    }
}) 
  
 
router.put('/UpdateProduct', async(req,res)=>{
    console.log(req.body)
    const{userid}=req.headers
    const {productId,productName,brandId,productCategoryId,alertQuantity,sequenceSorting,discountPercent,customField_1,customField_2,customField_3}=req.body;
    try {
        const data=await db.Product.updateOne({_id:productId},{product_name:productName,brand_id_fk:brandId,product_category_id_fk:productCategoryId,alert_quantity:alertQuantity,sequence_sorting:sequenceSorting,discount_percent:discountPercent,custom_field_1:customField_1,custom_field_2:customField_2,custom_field_3:customField_3,updated_by:parseInt(userid),updated_at:Date.now()});
        res.status(200).json({status:true,data:data})
    } catch (error) {
        res.status(404).json({status:false,data:null})
    }

})
router.delete('/DeleteProduct', async(req,res)=>{
    const{userid}=req.headers;
    const {productId}=req.body;
    try {
        const data=await db.Product.updateOne({_id:productId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()});
        res.status(200).json({status:true,data:data})
    } catch (error) {
        res.status(404).json({status:false,data:null})
    }
})




//product categories


router.get('/GetProductCategories', async(req,res)=>{
    var my_data=[]
  try{

  const data=await db.ProductCategory.find({is_deleted:false})
  for(let i=0;i<data.length;i++){
    var obj={categoryId:data[i]._id,categoryName:data[i].category_name,description:data[i].description}
    my_data.push(obj);
  } 

  res.status(200).json({status:true,data:my_data})

  }
  catch(error){
    console.log(error);
  }
})
router.get('/GetProductCategoryById',async(req,res)=>{
    
    const categoryId = req.body.categoryId
    
    try{
     const data=await db.ProductCategory.find({_id:categoryId})
     var obj={categoryId:data[0]._id,categoryName:data[0].category_name,description:data[0].description}
     res.status(200).json({status:true,data:obj})
    }
    catch(error){
      console.log(error);
    } 
})
router.post('/AddProductCategory', async (req, res) => {
    const { categoryName, description } = req.body;
  const { userid, authentication } = req.headers;
  try{ 
    
    const data = await db.ProductCategory.create({
    category_name: categoryName,
    description: description,
    created_by: parseInt(userid),
    created_at:Date.now()
  });
  res.status(200).json({ status: true, data: data });

  }

  catch(error){
    console.log(error);
  }
}) 
router.put('/UpdateProductCategory', async(req,res)=>{
    const{ categoryName, description,categoryId}=req.body;
    const{userid ,authentication} = req.headers;
    try{const data = await db.ProductCategory.updateOne(
     { _id:categoryId}, 
     {
     category_name: categoryName,
     description:description,
     updated_by: userid,
     updated_at:Date.now()
     });
     console.log(data);
     res.status(200).json({status:true, data:data });
   }
   catch(error){
     console.log(error);
   }

})
router.delete('/DeleteProductCategory', async(req,res)=>{
    const categoryId=req.body.categoryId;
    const deleted_by  =req.headers.userid
    
    try{
        const data=await db.ProductCategory.updateOne({_id:categoryId},
          {
             is_deleted:true,
             deleted_by:parseInt(deleted_by),
             deleted_at:Date.now()

        })
        res.status(200).json({status:true,data:data})
    }
    catch(error){
       console.log(error)
    }
})







//brands

router.get('/GetBrands', async(req,res)=>{
  var my_data=[]
  try{

  const data=await db.Brand.find({is_deleted:false})
  console.log(data)
  for(let i=0;i<data.length;i++){
    var obj={brandId:data[i]._id,brandName:data[i].brand_name,description:data[i].description}
    my_data.push(obj);
  } 

  res.status(200).json({status:true,data:my_data})

  }
  catch(error){
    console.log(error);
  }
})
router.get('/BrandById',async(req,res)=>{
    const brandId = req.body.brandId
    
    try{
     const data=await db.Brand.find({_id:brandId})
     var obj={brandId:data[0]._id,brandName:data[0].brand_name,description:data[0].description}
     res.status(200).json({status:true,data:obj})
    }
    catch(error){
      console.log(error);
    } 
})
router.post('/AddBrand', async (req, res) => {
    const { brandName, description } = req.body;
  const { userid, authentication } = req.headers;
  try{ 
    
    const data = await db.Brand.create({
    brand_name: brandName,
    description: description,
    created_by: parseInt(userid),
    created_at:Date.now()
  });
  res.status(200).json({ status: true, data: data });

  }

  catch(error){
    console.log(error);
  }
}) 
  
 
router.put('/UpdateBrand', async(req,res)=>{
    const{ brandName, description,brandId}=req.body;
    const{userid ,authentication} = req.headers;
    try{const data = await db.Brand.updateOne(
     { _id:brandId}, 
     {
     brand_name: brandName,
     description:description,
     updated_by: userid,
     updated_at:Date.now()
     });
     console.log(data);
     res.status(200).json({status:true, data:data });
   }
   catch(error){
     console.log(error);
   }

})
router.delete('/DeleteBrand', async(req,res)=>{
    const brandId=req.body.brandId;
    const deleted_by  =req.headers.userid
    
    try{
        const data=await db.Brand.updateOne({_id:brandId},
          {
             is_deleted:true,
             deleted_by:parseInt(deleted_by),
             deleted_at:Date.now()

        })
        res.status(200).json({status:true,data:data})
    }
    catch(error){
       console.log(error)
    }
})

module.exports=router;


