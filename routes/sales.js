const express=require('express');
const router=express.Router();
const db=require('../db')

//Quotation Tempolate
router.get('/GetAllQuotationTemplate', async (req, res) => {

    

})
router.get('/GetQuotationTemplateById', async (req, res) => {
    


}) 
router.post('/AddQuotationTemplate' , async(req,res)=>{
    const {templateName,description,QuotationData}=req.body;
    const {userid}=req.headers;

    try {
        const data=await db.Quotation_Template.create({name:templateName,description:description,created_by:parseInt(userid),created_at:Date.now()});
        try {
            for(let i=0;i<QuotationData.length;i++){
                const data1=await db.Quotation_Template_Record.create({template_id_fk:data._id,product_id_fk:QuotationData[i].productId,custom_no_1:QuotationData[i].customNo1,custom_no_2:QuotationData[i].customNo2,custom_no_3:QuotationData[i].customNo3,created_by:parseInt(userid),created_at:Date.now()})
            }
            return res.status(200).json({status:true})
        } catch (error) {
            
        }
    } catch (error) {
        
    }
})
router.put('/UpdateQuotationTemplate',async(req,res)=>{
    const {templateName,description,QuotationData,templateId}=req.body;
    const {userid}=req.headers;

    try {
        
        const data=await db.Quotation_Template.updateOne({_id:templateId},{name:templateName,description:description,updated_by:parseInt(userid),updated_at:Date.now()});
        try {
            const data1 = await db.Quotation_Template_Record.find({template_id_fk:templateId})
            var map=new Map();
                for(let i=0;i<data1.length;i++){
                    
                    const idAsString = data1[i].product_id_fk.toString();
                    map.set(idAsString,i);

                }
                flag=false

                for(let i=0;i<QuotationData.length;i++){
                    for(let j=0;j<data1.length;j++) {

                        if(map.get(QuotationData[i].productId)){
                            map.delete(QuotationData[i].productId);
                        }

                        if(QuotationData[i].productId==data1[j].productId){
                            flag==true;
                            break;
                        }

                       }
                       if(flag){
                        const data1=await db.Quotation_Template_Record.updateOne({template_id_fk:templateId,product_id_fk:QuotationData[i].productId},{custom_no_1:QuotationData[i].customNo1,custom_no_2:QuotationData[i].customNo2,custom_no_3:QuotationData[i].customNo3,updated_by:parseInt(userid),updated_at:Date.now()})
                        
                       }

                       else{
                        
                        const data3 = await db.Quotation_Template_Record.create({template_id_fk:templateId,product_id_fk:QuotationData[i].productId,custom_no_1:QuotationData[i].customNo1,custom_no_2:QuotationData[i].customNo2,custom_no_3:QuotationData[i].customNo3,created_by:parseInt(userid),created_at:Date.now()})
                          
                    }

                    }
                           
                    for(const key of map.keys()){
                        const data4= await db.Quotation_Template_Record.updateOne({template_id_fk:templateId,product_id_fk:key},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
                    }

            return res.status(200).json({status:true})
        } catch (error) {
            
        }
    } catch (error) {
        
    }
})
router.delete('/DeleteQuotationTemplate',async(req,res)=>{
    const {templateId}=req.body;
    const {userid}=req.headers;

    try {
        const data=await db.Quotation_Template.updateOne({_id:templateId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()});
        try {
                const data1=await db.Quotation_Template_Record.updateMany({template_id_fk:templateId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
            return res.status(200).json({status:true})
        } catch (error) {
            
        }
    } catch (error) {
        
    }
})


//Quotation 
router.get('/GetAllQuotation', async (req, res) => {
    var my_data=[]
    try{
        const data=await db.user.find({is_deleted:false})
        for(let i=0;i<data.length;i++){
            var obj={customerId:data[i].customer_id_fk,quotationNo:data[i].quotationNo,documentLocation:data[i].document_location,
                quotationDate:data[i].quotation_date,
                sellNote1:data[i].sell_note_1,
                sellNote2: data[i].sell_note_2,
                sellNote3:data[i].sell_note_3,
                sellNote4:data[i].sell_note_4,
                newField1:data[i].newField1,
                newField2:data[i].newField2,
                newField3:data[i].newField3,
                newField4:data[i].newField4,
                newField5:data[i].newField5,
                newField6:data[i].newField6,
                newField7:data[i].newField7,
                quotationRecords:data[i].quotationRecords}
            my_data.push(obj)

        }
        res.status(200).json({status:true,data:my_data})

    }
    catch(error){
        console.log(error)
    }


    
})
router.get('/GetQuotationById', async (req, res) => {
  
})

router.post('/AddQuotation' , async(req,res)=>{
  const {
 			customerId,
			quotationNo,
			documentLocation,
			quotationDate,
			sellNote1,
			sellNote2,
			sellNote3,
			sellNote4,
			newField1,
			newField2,
			newField3,
			newField4,
			newField5,
			newField6,
			newField7,
            quotationRecords,
            saveAsTemplate
        }=req.body;
        const {userid}=req.headers;
        try {
        const data=await db.Quotation.create({
        customer_id_fk:customerId,
        quotation_no:quotationNo,	
        document_location:documentLocation,
        quotation_date:new Date(quotationDate),
        sell_note_1:sellNote1,
        sell_note_2:sellNote2,
        sell_note_3:sellNote3,
        sell_note_4:sellNote4,
        new_field_1:newField1,
        new_field_2:newField2,
        new_field_3:newField3,
        new_field_4:newField4,
        new_field_5:newField5,
        new_field_6:newField6,
        new_field_7:newField7,
        new_field_8:newField8,
        created_by:parseInt(userid),
        created_at:Date.now()
    })
    try {
        for(let i=0;i<quotationRecords.length;i++){
            const data1=await db.Quotation_record.create({
                quotation_id_fk:data._id,
                product_id_fk:quotationRecords[i].productId,
                new_field_1:quotationRecords[i].newFeild1,
                new_field_2:quotationRecords[i].newFeild2,	
                new_field_3:quotationRecords[i].newFeild3,	
                created_by:parseInt(userid),
                created_at:Date.now()
            })
        }
        res.status(200).json({Status:true})
    } catch (error) {
        res.status(404).json({Status:false})
    }
        } catch (error) {
            res.status(404).json({Status:false})
        }
})

router.put('/UpdateQuotation',async(req,res)=>{
    const {
        quotationId,
        customerId,
       quotationNo,
       documentLocation,
       quotationDate,
       sellNote1,
       sellNote2,
       sellNote3,
       sellNote4,
       newField1,
       newField2,
       newField3,
       newField4,
       newField5,
       newField6,
       newField7,
       quotationRecords
   }=req.body;
   const {userid}=req.headers;
   try {
   const data=await db.Quotation.updateOne({_id:quotationId},{
   customer_id_fk:customerId,
   quotation_no:quotationNo,	
   document_location:documentLocation,
   quotation_date:new Date(quotationDate),
   sell_note_1:sellNote1,
   sell_note_2:sellNote2,
   sell_note_3:sellNote3,
   sell_note_4:sellNote4,
   new_field_1:newField1,
   new_field_2:newField2,
   new_field_3:newField3,
   new_field_4:newField4,
   new_field_5:newField5,
   new_field_6:newField6,
   new_field_7:newField7,
   new_field_8:newField8,
   updated_by:parseInt(userid),
   updated_at:Date.now()
})
try {
    const data1 = await db.Quotation_record.find({quotation_id_fk:quotationId})
    var map=new Map();
                for(let i=0;i<data1.length;i++){
                    
                    const idAsString = data1[i].product_id_fk.toString();
                    map.set(idAsString,i);

                }
    flag=false
   for(let i=0;i<quotationRecords.length;i++){
    for(let j=0;j<data1.length;j++) {

        if(map.get(quotationRecords[i].productId)){
            map.delete(quotationRecords[i].productId);
        }

        if(quotationRecords[i].productId==data1[j].productId){
            flag==true;
            break;
        }

       }
       if(flag){
        const data1=await db.Quotation_record.updateOne(
            {quotation_id_fk:quotationId,product_id_fk:quotationRecords[i].productId},
            {
                new_field_1:quotationRecords[i].newFeild1,
                new_field_2:quotationRecords[i].newFeild2,	
                new_field_3:quotationRecords[i].newFeild3,	
                updated_by:parseInt(userid),
                updated_at:Date.now()
            });
        
       }

       else{
        
        const data3 = await db.Quotation_record.create(
            {
                quotation_id_fk:quotationId,
                product_id_fk:quotationRecords[i].productId,
                new_field_1:quotationRecords[i].newFeild1,
                new_field_2:quotationRecords[i].newFeild2,	
                new_field_3:quotationRecords[i].newFeild3,	
                created_by:parseInt(userid),
                created_at:Date.now()
            }
            )
          
    }
   }
   for(const key of map.keys()){
    const data4= await db.Quotation_record.updateOne({quotation_id_fk:quotationId,product_id_fk:key},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
}
   res.status(200).json({Status:true})
} catch (error) {
   res.status(404).json({Status:false})
}
   } catch (error) {
       res.status(404).json({Status:false})
   }
})
router.delete('/DeleteQuotation',async(req,res)=>{
    const {quotationId}=req.body;

     try {
        const data=await db.Quotation.updateOne({_id:quotationId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()});
        try {
            const data1= await db.Quotation_record.updateOne({quotation_id_fk:quotationId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
            res.status(200).json({Status:true})
        } catch (error) {
            
        }
     } catch (error) {
        
     }
})



// Sales
router.get('/GetAllSales', async (req, res) => {
    
})
router.get('/GetSalesById', async (req, res) => {
  
})

router.post('/AddSales' , async(req,res)=>{
    
    const {
        customerId,
        ReferenceNo,
        posDate,
        totalPaid,
        totalBill,
        salesPayment,
        salesProduct
    }=req.body;
    const {userid}=req.headers
    try {
        const data = await db.sales.create({
            customer_id_fk: customerId,
            reference_number:ReferenceNo,
            date: new Date(posDate),
            total_bill: totalBill,
            total_paid: totalPaid,
            created_by: parseInt(userid),
            created_at: Date.now()
        });    
        for (let i = 0; i < salesProduct.length; i++) {
          const data2 = await db.sales_records.create({
            sales_id_fk:data._id,
            product_id_fk: salesProduct[i].productId,
            quantity:salesProduct[i].quantity,
            created_by: parseInt(userid),
            created_at: Date.now()
            
          });
        }
    
        for (let i= 0; i < salesPayment.length; i++) {
        try {
                
        
          const purchasePayment = await db.sales_payment.create({
            sales_id_fk:data._id,
            payment_date: new Date(salesPayment[i].paymentDate),
            payment_method: salesPayment[i].paymentMethod,
            amount:salesPayment[i].amount,
            created_by: parseInt(userid),
            created_at: Date.now()
          });
        } catch (error) {
                console.log(error)
        }
        }
    
        res.status(200).json({ status: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error: error.message });
      }
})

router.put('/UpdateSales',async(req,res)=>{
    const {userid}=req.headers;
    const {
        salesId,
        customerId,
        ReferenceNo,
        posDate,
        totalPaid,
        totalBill,
        salesPayment,
        salesProduct
    }=req.body;
    try {
        const data = await db.sales.updateOne({_id:salesId},{
            customer_id_fk: customerId,
            reference_number:ReferenceNo,
            date: new Date(posDate),
            total_bill: totalBill,
            total_paid: totalPaid,
            updated_by: parseInt(userid),
            updated_at: Date.now()
        });
        
            const data1 = await db.sales_records.find({sales_id_fk:salesId})
            
            var map=new Map();
                for(let i=0;i<data1.length;i++){
                    
                    const idAsString = data1[i].product_id_fk.toString();
                    map.set(idAsString,i+1);

                }
               
    var flag=false
    for(let i=0;i<salesProduct.length;i++){
        for(let j=0;j<data1.length;j++) {
        
        if(map.get(salesProduct[i].productId.toString())){
            map.delete(salesProduct[i].productId);
            
        }
        

        if(salesProduct[i].productId==data1[j].product_id_fk){
            flag=true;
            break;
        }

       }
       if(flag){
        const data2=await db.sales_records.updateOne(
            {sales_id_fk:salesId,product_id_fk:salesProduct[i].productId},
            {
                quantity:salesProduct[i].quantity,	
                updated_by:parseInt(userid),
                updated_at:Date.now()
            });
            console.log(data2)
            flag=false
       }
        else{
        
        const data3 = await db.sales_records.create({
            sales_id_fk:salesId,
            product_id_fk: salesProduct[i].productId,
            quantity:salesProduct[i].quantity,
            created_by: parseInt(userid),
            created_at: Date.now()
            
          });
            
          
    }
            }
           
    for(const key of map.keys()){
        const data4= await db.sales_records.updateOne({sales_id_fk:salesId,product_id_fk:key},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
        console.log(data4)
    }
            const data11 = await db.sales_payment.find({sales_id_fk:salesId})
            var map1=new Map();
                for(let i=0;i<data11.length;i++){
                    const idAsString = data11[i]._id;
                    map1.set(idAsString,i);

                }
var flag1=false
for(let i=0;i<salesPayment.length;i++){
    for(let j=0;j<data11.length;j++) {
        if(map1.get(salesPayment[i].paymentId)){
            map1.delete(salesPayment[i].paymentId);
        }
        
        if(salesPayment[i].paymentId==data11[j]._id){
            
            flag1=true;
            break;
        }
       }
       if(flag1){
        const data1=await db.sales_payment.updateOne(
            {sales_id_fk:salesId,_id:salesPayment[i].paymentId},
            {
                payment_date: new Date(salesPayment[i].paymentDate),
                payment_method: salesPayment[i].paymentMethod,
                amount:salesPayment[i].amount,	
                updated_by:parseInt(userid),
                updated_at:Date.now()
            });
            flag1=false
        
       }

       else{
        
        const purchasePayment = await db.sales_payment.create({
            sales_id_fk:salesId,
            payment_date: new Date(salesPayment[i].paymentDate),
            payment_method: salesPayment[i].paymentMethod,
            amount:salesPayment[i].amount,
            created_by: parseInt(userid),
            created_at: Date.now()
          });
            
          
    }
            }
            for(const key of map1.keys()){
    const data4= await db.sales_payment.updateOne({sales_id_fk:salesId,_id:key},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
            }
    
        
    
        res.status(200).json({ status: true });
      } catch (error) {
        console.log(error)
        res.status(500).json({ status: false, error: error.message });
      }
})
router.delete('/DeleteSales',async(req,res)=>{
     try {
        const data1= await db.sales.updateOne({_id:salesId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
        const data2= await db.sales_records.updateOne({sale_id_fk:salesId},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
        const data3= await db.sales_payment.updateOne({sale_id_fk:salesId,},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
        res.status(200).json({data1,data2,data3, status:true})
     } catch (error) {
        
     }
})



//Sales Expired
router.get('/SalesExpired', async(req, res) => {
    try {
        const data=await db.batch.find({
            expiry_dates: {
              $lt: new Date(Date.now())
            }
          });
          
         res.status(200).json({data});
    } catch (error) {
        console.log(error)
    }
})


//Sales Near Expiry
router.get('/SalesNearExpiry', async(req, res) => {
    const currentDate = new Date();
const sixMonthsFromNow = new Date(currentDate);
sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
try {
    const result = await db.batch.find({
        expiry_dates: {
          $gte: currentDate,
          $lt: sixMonthsFromNow
        }
      });
} catch (error) {
    
}
})


//Sales Low Stock
router.get('/SalesLowStock', async(req, res) => {
    try {
        const result = await db.Product.find({
          quantity: { $lte: '$alert_quantity' }
        })
    
        
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
})





//Sales Return
router.get('/GetAllSalesReturn', async (req, res) => {
    
})
router.get('/GetSalesReturnById', async (req, res) => {
})
router.post('/AddSalesReturn' , async(req,res)=>{
    const {
        customerId,
        returnRefNo,
        returnDate,
        totalBill,
        todalPaid,
        returnRecordData
        }=req.body;
        const {userid}=req.headers
    try {
        const data=await db.sales_return.create({customer_id_fk:customerId,
            return_ref_no:returnRefNo,
            return_date:returnDate,
            total_bill:totalBill,
            total_paid:todalPaid,
            created_by:parseInt(userid),
            created_at:Date.now()
        })
        for(let i=0;i<returnRecordData.length;i++){
            const data1=await db.sales_return_records.create(
                {
                    return_id_fk:data._id,
                    product_id_fk:returnRecordData[i].productId,
                    batch_id_fk:returnRecordData[i].batchId,
                    return_quantity:returnRecordData[i].quantity,
                    created_by:parseInt(userid),
                    created_at:Date.now()
                })
        }
    } catch (error) {
        
    }
})
router.put('/UpdateSalesReturn',async(req,res)=>{
    const {
        returnId,
        customerId,
        returnRefNo,
        returnDate,
        totalBill,
        todalPaid,
        returnRecordData
        }=req.body;
        const {userid}=req.headers
    try {
        const data=await db.sales_return.updateOne({_id:returnId},{customer_id_fk:customerId,
            return_ref_no:returnRefNo,
            return_date:returnDate,
            total_bill:totalBill,
            total_paid:todalPaid,
            updated_by:parseInt(userid),
            updated_at:Date.now()
        })
        try {
            const data1 = await db.sales_return_records.find({return_id_fk:returnId})
            
            var map=new Map();
                for(let i=0;i<data1.length;i++){
                    const idAsString = data1[i].product_id_fk.toString();
                    map.set(idAsString,i);

                }
               
    var flag=false;
    for(let i=0;i<returnRecordData.length;i++){
        for(let j=0;j<data1.length;j++) {
        
        if(map.get(returnRecordData[i].productId.toString())){
            map.delete(returnRecordData[i].productId);
            
        }
        if(returnRecordData[i].productId==data1[j].product_id_fk){
            flag=true;
            break;
        }
       }
       if(flag){
        const data2=await db.sales_return_records.updateOne(
            {return_id_fk:returnId,product_id_fk:returnRecordData[i].productId},
            {
                batch_id_fk:returnRecordData[i].batchId,
                return_quantity:returnRecordData[i].quantity,
                updated_by:parseInt(userid),
                updated_at:Date.now()
            });
            flag=false
       }
        else{
        
            const data3=await db.sales_return_records.create(
                {
                    return_id_fk:data._id,
                    product_id_fk:returnRecordData[i].productId,
                    batch_id_fk:returnRecordData[i].batchId,
                    return_quantity:returnRecordData[i].quantity,
                    created_by:parseInt(userid),
                    created_at:Date.now()
                })
            
          
    }
            }
           
    for(const key of map.keys()){
        const data4= await db.sales_return_records.updateOne({return_id_fk:returnId,product_id_fk:key},{is_deleted:true,deleted_by:parseInt(userid),deleted_at:Date.now()})
        console.log(data4)
    }
        } catch (error) {
            
        }
        for(let i=0;i<returnRecordData.length;i++){
            const data1=await db.sales_return_records.create(
                {
                    return_id_fk:data._id,
                    product_id_fk:returnRecordData[i].productId,
                    batch_id_fk:returnRecordData[i].batchId,
                    return_quantity:returnRecordData[i].quantity,
                    created_by:parseInt(userid),
                    created_at:Date.now()
                })
        }
    } catch (error) {
        
    }
})
router.delete('/DeleteSalesReturn',async(req,res)=>{
    const {returnId}=req.body;
    const {userid}=req.headers;
     try {
        const data=await db.sales_return.updateOne({_id:returnId},{
            is_deleted:true,
            created_by:parseInt(userid),
            created_at:Date.now()
        })
        const data1=await db.sales_return_records.updateMany({return_id_fk:returnId},{
            is_deleted:true,
            created_by:parseInt(userid),
            created_at:Date.now()
        })
        res.status(200).json({status:true})
     } catch (error) {
        res.status(404).json({status:false,error:error.message})
     }
})



module.exports=router;