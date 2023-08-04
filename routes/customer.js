const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/customer", async (req, res) => {
    var my_data=[]
    try{

    const data=await db.Customers.find({is_deleted:false}) 
    for(let i=0;i<data.length;i++){
      var obj={categoryId:data[i]._id,categoryName:data[i].category_name,description:data[i].description}
      my_data.push(obj);
    } 

    res.status(200).json({status:true,data:data})
             
    }
    catch(error){
      console.log(error); 
    }
    
});
router.get("/customerById", async (req, res) => {
    const customerId = req.body.customerId
    try{
      const data=await db.Customers.find({_id:customerId})
      var obj={customerId:data[0]._id,categoryName:data[0].category_name,description:data[0].description}
      res.status(200).json({status:true,data:obj})
    }
    catch(error){
      console.log(error);
    }
    
    
});   
router.post("/customer", async (req, res) => {
  

 const {
    categoryId,
    customerCode,
    name,
    ethiniity,
    address, 
    customField_1,
    customField_2,
    contactNo_1,
    contactNo_2,
    contactNo_3,
  } = req.body;
  const { userid, authentication } = req.headers;
  try{
    const data = await db.Customers.create({
          category_id_fk: categoryId,
          customer_code: customerCode,
          name: name,
          ethiniity: ethiniity,
          address: address,
          custom_field_1:customField_1,
          custom_field_2:customField_2,
          contact_no_1:contactNo_1,
          contact_no_2:contactNo_2,
          contact_no_3:contactNo_3,
          created_by:parseInt(userid),
          created_at:Date.now()
  });
  console.log(data);
  res.status(200).json({ status: true, data: data });
}
catch(error){
  console.log(error)
}
  
});

router.put("/customer", async (req, res) => {

  const {
    customerId,
    categoryId,
    customerCode,
    name,
    ethiniity,
    address,
    customField_1,
    customField_2,
    contactNo_1,
    contactNo_2,
    contactNo_3,
  } = req.body;
  const { userid, authentication } = req.headers;
  try{
    const data = await db.Customers.updateOne({_id:customerId},{
          category_id_fk: categoryId,
          customer_code: customerCode,
          name: name,
          ethiniity: ethiniity,
          address: address,
          custom_field_1:customField_1,
          custom_field_2:customField_2,
          contact_no_1:contactNo_1,
          contact_no_2:contactNo_2,
          contact_no_3:contactNo_3,
          updated_by:parseInt(userid),
          updated_at:Date.now()
  });
  console.log(data);
  res.status(200).json({ status: true, data: data });
}
catch(error){
  console.log(error)
}

});
router.delete("/customer", async (req, res) => {
    
  const {customerId} = req.body;
  const { userid, authentication } = req.headers;
  try{
    const data = await db.Customers.updateOne({_id:customerId},{
          
          is_deleted:true,
          deleted_by_by:parseInt(userid),
          deleted_at:Date.now()
  });
  console.log(data);
  res.status(200).json({ status: true, data: data });

}catch(error){
  console.log(error)
}


});

router.get("/category", async (req, res) => {
  var my_data=[]
  try{

  const data=await db.CustomerCategory.find({is_deleted:false})
  for(let i=0;i<data.length;i++){
    var obj={categoryId:data[i]._id,categoryName:data[i].category_name,description:data[i].description}
    my_data.push(obj);
  } 

  res.status(200).json({status:true,data:my_data})

  }
  catch(error){
    console.log(error);
  }
});
router.get("/categoryById", async (req, res) => {
  console.log(req.body)
  const categoryId = req.body.categoryId
  
  try{
   const data=await db.CustomerCategory.find({_id:categoryId})
   var obj={categoryId:data[0]._id,categoryName:data[0].category_name,description:data[0].description}
   res.status(200).json({status:true,data:obj})
  }
  catch(error){
    console.log(error);
  } 


});
router.post("/category", async (req, res) => {
  // console.log(req.headers);
  // console.log(req.body);
  const { categoryName, description } = req.body;
  const { userid, authentication } = req.headers;
  // console.log(authentication);
  try{ 
    
    const data = await db.CustomerCategory.create({
    category_name: categoryName,
    description: description,
    created_by: parseInt(userid),
    created_at:Date.now()
  });

  // console.log(data);
  res.status(200).json({ status: true, data: data });

  }

  catch(error){
    console.log(error);
  }
  // console.log(req.headers)
});

router.put("/category", async (req, res) => {
     
     const{ categoryName, description,categoryId}=req.body;
     const{userid ,authentication} = req.headers;
     try{const data = await db.CustomerCategory.updateOne(
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
     
    
});


router.delete("/category", async (req, res) => {
  console.log(req.headers)
    const categoryId=req.body.categoryId;
    const deleted_by  =req.headers.userid
    
    try{
        const data=await db.CustomerCategory.updateOne({_id:categoryId},
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
});

module.exports = router;
