const express=require('express');
const router=express.Router();
const db=require('../db')


//purchase
router.get('/GetAllPurchases',async(req,res)=>{

  var my_data = [];
  try {
    const data = await db.purchase.find({ is_deleted: false });
    for (let i = 0; i < data.length; i++) {
      const data1=await db.supplier.find({_id:data[i].supplier_id_fk});

      var obj = { 
        purchaseId: data[i]._id,
        supplierName: data1[0].name,
        invoiceNumber: data[i].invoice_number,
        totalBill: data[i].total_bill,
        totalPaid: data[i].total_paid,
        purchaseDate:data[i].purchase_date,
        AddedBy:data[i].created_by,
        AddedOn:data[i].created_at
      };
      my_data.push(obj);
    }
    res.status(200).json({ status: true, data: my_data });
  } catch (error) {
    console.log(error);
    
  }

})
router.get('/PurchaseById',async(req,res)=>{
  const {purchaseId}=req.body;
  var billingData=[];
  var productData=[];
  try {
    const data = await db.purchase.find({ is_deleted: false });
      var obj = { 
        purchaseId: purchaseId,
        supplierId: data[0].supplier_id_fk,
        purchaseDate:data[0].purchase_date,
        invoiceNumber: data[0].invoice_number,
        totalBill: data[0].total_bill,
        totalPaid: data[0].total_paid,
        documentLocation: data[0].document_location,
      };
      
      const data1 = await db.purchase_record.find({
        is_deleted: false,purchase_id_fk:purchaseId
      });
      for (let j = 0; j < data1.length; j++) {
        let data2 = await db.batch.find({
          _id:data1[j].batch_no
        });
        var obj1 = {
        purchaseId: data1[j].purchase_id_fk,
        productId: data1[j].product_id_fk,
        batchNo: data2[0].batch_no, 
        expDate:data2[0].expiry_dates ,
        packOf:data2[0].pack_of,
        mrpPerPack: data2[0].mrp_per_pack,
     };
        productData.push(obj1);
      }
      const data2 = await db.purchase_payment.find({
        is_deleted: false,
        purchase_id_fk: data[i].purchaseId
      });

      for (let k = 0; k < data2.length; k++) {
        var obj2 = {
          purhcaseId: data2[k].purchase_id_fk,
          reciverId:data[k]._id,
          receiverName : data2[k].receiver_name,
          receiverContact : data2[k].receiver_contact,
          paymentDate:data2[k].payment_date,
          amount: data2[k].amount,
          paymentMethod : data2[k].payment_method,
     };
        billingData.push(obj2);
      }

      
    res.status(200).json({ status: true, data: {
      obj,
      billingData:billingData,
      productData:productData
    } });
  } catch (error) {
    console.log(error);
    
  }
})
router.post('/AddPurchase', async (req, res) => {
  try {
    const { supplierId, invoiceNumber, totalBill, totalPaid, documentLocation } = req.body;
    const { userid, authentication } = req.headers;
    const { productData, billingData } = req.body;
    const purchaseDate = new Date(req.body.purchaseDate);

    const purchase = await db.purchase.create({
      supplier_id_fk: supplierId,
      invoice_number: invoiceNumber,
      purchase_date: purchaseDate,
      total_bill: totalBill,
      total_paid: totalPaid,
      document_location: documentLocation,
      created_by: parseInt(userid),
      created_at: Date.now()
    });
    for (let i = 0; i < productData.length; i++) {
      const expDate = new Date(productData[i].expDate);
      const batch = await db.batch.create({
        batch_no: productData[i].batchNo,
        product_id_fk: productData[i].productId,
        expiry_dates: expDate,
        pack_of: productData[i].packOf,
        mrp_per_pack: productData[i].mrpPerPack,
        created_by: parseInt(userid),
        created_at: Date.now()
        
      });
      const purchaserecord = await db.purchase_record.create({
        purchase_id_fk:purchase._id,
        product_id_fk: productData[i].productId,
        batch_id_fk: batch._id,
        order_quantity:productData[i].quantity,
        created_by: parseInt(userid),
        created_at: Date.now()

      })
    }

    for (let j = 0; j < billingData.length; j++) {
      const paymentDate = new Date(billingData[j].paymentDate);
      const purchasePayment = await db.purchase_payment.create({
        purchase_id_fk:purchase._id,
        receiver_name: billingData[j].receiverName,
        receiver_contact: billingData[j].receiverContact,
        payment_date: paymentDate,
        amount: billingData[j].amount,
        payment_method: billingData[j].paymentMethod,
        created_by: parseInt(userid),
        created_at: Date.now()
      });
    }

    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
});
router.put('/UpdatePurchase',async(req,res)=>{


})
router.delete('/DeletePurchase',async(req,res)=>{
  const {purchaseId}=req.body;
  const {userid}=req.headers;
try {
  await db.purchase.updateOne({_id:purchaseId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()});
  await db.purchase_record.updateMany({purchase_id_fk:purchaseId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()});
  await db.purchase_payment.updateMany({purchase_id_fk:purchaseId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()});
  res.status(200).json({status:true})
} catch (error) {
  res.status(500).json({status:false,message:error.message})
}
  

})


//purchase order

router.get('/GetAllPurchaseOrders', async (req, res) => {
  var my_data = [];
  

  try {
    const purchaseorders = await db.po.find({ is_deleted: false });
    console.log(purchaseorders);

    for (let i = 0; i < purchaseorders.length; i++) {
      var obj = {
        poId: purchaseorders[i]._id,
        poNumber: purchaseorders[i].po_number,
        poDate: purchaseorders[i].po_date,
        supplierId: purchaseorders[i].supplier_id_fk,
        status: purchaseorders[i].status,
        purchaseNote: purchaseorders[i].purchase_note,
        poProductData : []
      };
      
      const data1 = await db.po_record.find({
        is_deleted: false,
        po_id_fk: purchaseorders[i]._id
      });
      for (let j = 0; j < data1.length; j++) { 
        var obj1 = {
          _id: data1[j].po_id_fk,
          productId: data1[j].product_id_fk,
          quantity: data1[j].order_quantity
         };
        obj.poProductData.push(obj1);
      }

      my_data.push(obj);
    }

    res.status(200).json({ status: true, data: my_data });
  } catch (error) {
    console.log(error);
    
  }
});

router.get('/GetPurchaseOrderById' , async(req,res)=>{
    const{poId}=req.body
    var poProductData=[]
  
    try {
      const data = await db.po.find({ _id:poId });
      
        
        var data1 = await db.po_record.find({po_id_fk:poId });
        var obj={productId:data1[0].product_id_fk,quantity:data1[0].order_quantity}
        poProductData.push(obj)

        var FinalData={poId: poId,poNumber: data[0].po_number,poDate: data[0].po_date,supplierId: data[0].supplier_id_fk,status: data[0].status,purchaseNote: data[0].purchase_note,poProductData:poProductData}
        res.status(200).json({status:true,data:FinalData})
    } catch (error) {
      console.log(error);
      
    }

})

router.post('/AddPurchaseOrder' , async(req,res)=>{
    const{userid,authentication}=req.headers
    const{poNumber,supplierId,status,purchaseNote}=req.body
    const{poProductData}=req.body
     const poDate = new Date(req.body.poDate)

    try{
        const data= await db.po.create({po_number:poNumber,po_date:poDate,supplier_id_fk:supplierId,status:status,purchase_note:purchaseNote,created_by:parseInt(userid),created_at:Date.now()})
        console.log(data)
        try{
            for(let i=0;i<poProductData.length;i++){
                const data1= await db.po_record.create({ po_id_fk:data._id,product_id_fk:poProductData[i].productid,order_quantity:poProductData[i].quantity,created_by:parseInt(userid),created_at:Date.now()})
            }
            res.status(200).json({status:true})
        }
        catch(error){
            console.log(error)
        }

    }catch(error){
        console.log(error)
    }

})

router.put('/UpdatePurchaseOrder',async(req,res)=>{
    const{userid,authentication}=req.headers
    // console.log(req.body)
    const{poNumber,supplierId,status,purchaseNote,poId}=req.body
    const{poProductData}=req.body
    const poDate = new Date(req.body.poDate)
    try{

        const data= await db.po.updateOne({_id:poId},
            {
                po_number:poNumber,
                po_date:poDate,
                supplier_id_fk:supplierId,
                status:status,
                purchase_note:purchaseNote,
                updated_by:parseInt(userid),
                updated_at:Date.now()
            })
        // console.log(data)
        try{
            const data1= await db.po_record.find({po_id_fk:poId})
    
            var map= new Map()
            for(let i=0;i<data1.length;i++){
                const idAsString = data1[i].product_id_fk.toString();
                map.set(idAsString,i);
            }
            flag=false

            for(let i=0;i<poProductData.length;i++){
                for(let j=0;j<data1.length;j++){
            
                    if(map.get(poProductData[i].productid)){
                        map.delete(poProductData[i].productid);
                    }
                    if(poProductData[i].productid==data1[j].product_id_fk){
                        flag=true;
                        break;
                    }
                }
                if(flag){
                        
                    const data2 = await db.po_record.updateOne({po_id_fk:poId,product_id_fk:poProductData[i].productid},{order_quantity:poProductData[i].quantity})
                    flag= false;
                       
                    }
                    else{
                        
                        const data3= await db.po_record.create({ po_id_fk:poId,product_id_fk:poProductData[i].productid,order_quantity:poProductData[i].quantity,created_by:parseInt(userid),created_at:Date.now()})
                        
                        }
                    }
                    console.log(map)
                    for (const key of map.keys()) {
                        const data6=await db.po_record.updateOne({po_id_fk:poId ,product_id_fk:key},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
                           
                    }
                     res.status(200).json({status:true})   
                
            }
            catch(error){
                console.log(error)
            }

        }catch(error){
            // console.log(error)
        }
    




})

router.delete('/DeletePurchaseOrder',async(req,res)=>{
    const {poId}=req.body
    const{userid}=req.headers

    try{
        const data= await db.po.updateOne({_id:poId},{is_deleted:true,deleted_by:userid,deleted_at:Date.now()})
        try{
            const data1 = await db.po_record.updateMany({po_id_fk:poId},{is_deleted:true,deleted_by:userid,deleted_at:Date.now()})

            //console.log(data1)
            res.status(200).json({status:true})
        }catch(error){
            console.log(error)
        }

    
    }catch(error){
        throw error;
    }
    
})



//purchase Return
router.get('/Getpurchasesreturn',async(req,res)=>{
    
    var Final_data=[]
    var One_Data=[];

    try{
        const data= await db.purchase_return.find({is_deleted:true})
        console.log(data)

        for(let i=0;i<data.length;i++){
          var data1= await db.purchase_return_record.find({is_deleted:true,return_id_fk:data[i]._id});
          for(let j=0;j<data1.length;j++){
            var obj1={productId:data1[j].product_id_fk,batchId:data1[j].batch_id_fk,quantity:data1[j].return_quantity};
            One_Data.push(obj1);
          }
            var obj={supplierId:data[i].supplier_id_fk, returnRefNo:data[i].return_ref_no,ReturnDate:data[i].return_date,totalBill: data[i].total_return_bill,}
        }

    
    }catch(error){

    }

})
router.get('/GetAllPurchaseOrders',async(req,res)=>{

})
router.post('/AddPurchasereturn',async(req,res)=>{
    const{userid,authentication}=req.headers
    const {supplierId, returnRefNo, totalBill}= req.body
    const ReturnDate = new Date(req.body.ReturnDate)
    
    const{AddProduct}= req.body

    try{
        const data= await db.purchase_return.create({supplier_id_fk:supplierId, return_ref_no:returnRefNo,return_date:ReturnDate,total_return_bill:totalBill,created_by:parseInt(userid),created_at:Date.now()})
        console.log(data);

        try{
            for(let i=0;i<AddProduct.length;i++){
              const data1=await db.purchase_return_record.create({return_id_fk:data._id,product_id_fk:AddProduct[i].productId,batch_id_fk:AddProduct[i].batchId,return_quantity:AddProduct[i].returnQuantity,created_by:parseInt(userid),created_at:Date.now()})
            }
            res.status(200).json({status:true})
          }
          catch(error){
            console.log(error)
          }
          
        }
        catch(error){
        console.log(error)
    }





    })

router.put('/UpdatePurchaseReturn',async(req,res)=>{
    // console.log(req.body)
    const{userid,authentication}=req.headers
    const {supplierId, returnRefNo, totalBill,returnId,AddProduct}= req.body
    const ReturnDate = new Date(req.body.ReturnDate)
    // console.log(req.body)
    console.log(AddProduct)

    try{
        const data= await db.purchase_return.updateOne({_id:returnId},
            {supplier_id_fk:supplierId,
             return_ref_no:returnRefNo,
             return_date:ReturnDate, 
              total_return_bill:totalBill,
              updated_by:parseInt(userid),
              updated_at:Date.now()
            })
            // console.log(1)
            try{
                const data1 = await db.purchase_return_record.find({return_id_fk:returnId})
                // console.log(data1)
                var map=new Map();
                for(let i=0;i<data1.length;i++){
                    
                    const idAsString = data1[i].product_id_fk.toString();
                    map.set(idAsString,i);

                }
                //  ok

                // console.log(map);


                flag=false

                for(let i=0;i<AddProduct.length;i++){
                    for(let j=0;j<data1.length;j++) {

                        if(map.get(AddProduct[i].productId)){
                            map.delete(AddProduct[i].productId);
                        }

                        if(AddProduct[i].productId==data1[j].productId){
                            flag==true;
                            break;
                        }

                       }
                       if(flag){
                        const data2=await db.purchase_return_record.updateOne({return_id_fk:returnId,product_id_fk:AddProduct[i].productId},{batch_id_fk:AddProduct[i].batchId,return_quantity:AddProduct[i].returnQuantity,updated_by:parseInt(userid),updated_at:Date.now()})
                        
                       }

                       else{
                        
                        const data3 = await db.purchase_return_record.create({return_id_fk:returnId,product_id_fk:AddProduct[i].productId,batch_id_fk:AddProduct[i].batchId,return_quantity:AddProduct[i].returnQuantity,created_by:parseInt(userid),created_at:Date.now()})
                          
                    }

                    }
                           
                    for(const key of map.keys()){
                        const data4= await db.purchase_return_record.updateOne({return_id_fk:returnId,product_id_fk:key},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
                    }
                    res.status(200).json({status:true })
            } catch(error){
                console.log(error)

              }
                // Gadhi

    }  catch(error){
        console.log(error)

       }


})

router.delete('/DeletePurchaseReturn',async(req,res)=>{
    const{returnId}=req.body
    const {userid}=req.headers

    try{
        const data= await db.purchase_return.updateOne({_id:returnId},{ is_deleted:true,deleted_by:userid,deleted_at:Date.now()})

       // console.log(data);

        try{
            const data1= await db.purchase_return_record.updateMany({return_id_fk:returnId},{is_deleted:true,deleted_by:userid,deleted_at:Date.now()})
          //  console.log(data1)
            res.status(200).json({status:true})
        }
        catch(error){
            console.log(error)
        }
 

    }catch(error){
        console.log(error);
    }
    

})


module.exports=router;