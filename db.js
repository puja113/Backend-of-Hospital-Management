const mongoose= require('mongoose')

//roles
const role_schema= mongoose.Schema({
    role_name:{
        type:String,
        required:true
    },	
    description:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const role=mongoose.model('role',role_schema);

//users
const user_schema=mongoose.Schema({
    role_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'role',
            required:true 
    },
    user_code:{
        type:String,
        unique: true,
        required:true
    },	
    name:{
        type:String
    },
    password:{
        type:String
    },
    
    address:{
        type:String
    },
    email:{
        type:String,
        unique: true
    },
    profile_pic:{
        type:String
    },
    contact_no_1:{
        type:Number
    },
    contact_no_2:{
        type:Number
    },
    contact_no_3:{
        type:Number
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const user=mongoose.model('user',user_schema);



//feature
const feature_schema=mongoose.Schema({
    feature_name:{
        type:String,
        required:true
    },	
    description:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date
    },
})
const feature=mongoose.model('feature',feature_schema);
    
 //role feature
 
const role_feature_schema=mongoose.Schema({

    role_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'role',
            required:true 
            
    },

    feature_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'feature',
        required:true 
    },
    view_perm:{
        type:Boolean,
        
    },	
    add_perm:{
        type:Boolean
    },
    edit_perm:{
        type:Boolean
    },
    delete_perm:{
        type:Boolean
    },
    
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const role_feature=mongoose.model('role_feature',role_feature_schema);
    
    
    
//supplier 
 const supplier_schema=mongoose.Schema({
    supplier_code:{
        type:String,
        required:true 
    },
    name:{
        type:String,
        required:true
    },
    address:{
     type:String
    },   
    contact_no_1:{
        type:String,
        required:true,
     },
    contact_no_2:{
       type:String
     },
    contact_no_3:{
        type:String
    },
    is_deleted:{
        type:Boolean,
        default:false,
        required:true,
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true,
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const supplier=mongoose.model('supplier',supplier_schema);



    



//Customer Category
const Customer_Category_Schema=mongoose.Schema({
    category_name:{
        type:String,
        required:true
    },	
    description:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:String,
        required:true
        
    }, 
    updated_by:{
        type:Number,
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})   
const CustomerCategory=mongoose.model('CustomerCategory',Customer_Category_Schema);

//Customers
const Customers_Schema=mongoose.Schema({

    category_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'CustomerCategory',
            required:true 
    },
    customer_code:{
        type:String,
        required:true
    },	
    name:{
        type:String
    },
    ethiniity:{
        type:String
    },
    address:{
        type:String
    },
    custom_field_1:{
        type:String
    },
    custom_field_2:{
        type:String
    },
    profile_pic:{
        type:String
    },
    contact_no_1:{
        type:String
    },
    contact_no_2:{
        type:String
    },
    contact_no_3:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const Customers=mongoose.model('Customers',Customers_Schema);

//product category 123
const product_category_schema= mongoose.Schema({
    category_name:{
        type:String,
        required:true
    },	
    description:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true 

    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const ProductCategory =mongoose.model('ProductCategory',product_category_schema);


// Brand 137
const Brand_schema= mongoose.Schema({
    brand_name:{
        type:String,
        required:true
    },	
    description:{
        type:String
    },
    is_deleted:{
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const Brand=mongoose.model('Brand',Brand_schema);

// Product 151
const Product_schema=mongoose.Schema({
     product_name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    },
    
    brand_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Brand',
            required:true 
    },
    product_category_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductCategory',
        required:true 
    },
    alert_quantity:{
        type:Number,
        required:true
    },	
    sequence_sorting:{
        type:String
    },
    discount_percent:{
        type:Number
    },
   
    custom_field_1:{
        type:String
    },
    custom_field_2:{
        type:String,
    },
    custom_field_3:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        default:true,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date
    },
})
const Product=mongoose.model('Product', Product_schema);



//Batch 173

const Batch_schema= mongoose.Schema({
    product_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true 
    },
    batch_no:{
        type:String,
        required:true
    },	
    expiry_dates:{
        type:Date,
        required:true
    },
    pack_of:{
    
        type:Number,
        required:true
    },
    mrp_per_pack:{
        type:Number,
        required:true
    },
    is_deleted:{
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number 
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date
    },
})
const batch=mongoose.model('batch',Batch_schema);



//Purchase Order 190
const po_schema= mongoose.Schema({
    supplier_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'supplier',
        required:true 
    },
    po_number:{
        type:String,
        required:true
    },	
    po_date:{
        type:Date
       
    },
    status:{
    
        type:Boolean,
        required:true
    },
    purchase_note:{
        type:String
       
    },
    
    is_deleted:{
        type:Boolean,
        required:true,
        default:false
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date
    },
})
const po=mongoose.model('po',po_schema);




//purchase order Records 205
const po_record_schema= mongoose.Schema({
    po_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'po',
        required:true 
    },
    
    
    product_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true 
    },

    order_quantity:{
        type:Number,
        required:true
    },	
    
    is_deleted:{
        type:Boolean,
        required:false,
        default:false

    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const po_record=mongoose.model('po_record',po_record_schema);


//purchase 219

const purchase_schema= mongoose.Schema({
    supplier_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'supplier',
        required:true 
    },
    invoice_number:{
        type:String,
        required:true
    },	
    purchase_date:{
        type:Date
       
    },
    total_bill:{
        type:Number,
        
    },	
    total_paid:{
        type:Number,
        
    },	
    document_location:{
        type:String,
        
    },	
    is_deleted:{
        type:Boolean,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date
    },
})
const purchase =mongoose.model('purchase',purchase_schema);



//Purchase Records 237
const purchase_record_schema = mongoose.Schema({
    purchase_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'purchase',
        required:true 
    },
    product_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true 
    },
    batch_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'batch',
        required:true 
    },
    	
   
    order_quantity:{
        type:Number,
        required:true
        
    },	
    is_deleted:{
        type:Boolean,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date
    },

})

const purchase_record=mongoose.model('purchase_record',purchase_record_schema);


// Purchase Payment 252
const purchase_payment_schema = mongoose.Schema({
    purchase_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'purchase',
        required:true 
    },
    receiver_name:{
        type:String
    },
    receiver_contact:{
        type:Number
    },
    payment_method:{
        type:Number,
        required:true
    },
    amount:{
        type:Number
        
    },
    payment_date:{
        type:Date,
        required:true

    },	

    is_deleted:{
        type:Boolean,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date
    },

})

const purchase_payment=mongoose.model('purchase_payment',purchase_payment_schema);


//Purchase Return 270
const purchase_return_schema = mongoose.Schema({
    supplier_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'supplier',
        required:true 
    },
    return_ref_no:{
        type:String,
        required:true
        
    },
    return_date:{
        type:Date
    },	
   
    total_return_bill:{
        type:Number
    },	
    is_deleted:{
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },

})

const purchase_return=mongoose.model('purchase_return',purchase_return_schema);

//Purchase Return Recods 287
const purchase_return_record_schema = mongoose.Schema({
    return_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'purchase_return',
        required:true 
    },
    product_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true 
    },
    batch_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'batch',
        required:true 
    },
    	
   
    return_quantity:{
        type:Number,
        required:true
        
    },	
    is_deleted:{
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date
    },

})

const purchase_return_record=mongoose.model('purchase_return_record',purchase_return_record_schema);



// Quotation 303

const Quotation_schema=mongoose.Schema({
    customer_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'customers',
            required:true 
    },
    quotation_no:{
        type:String,
        required:true
    },	
    document_location:{
        type:String
    },
    quotation_date:{
        type:Date
    },
    sell_note_1:{
        type:String
    },
    sell_note_2:{
        type:String
    },
    sell_note_3:{
        type:String
    },
    sell_note_4:{
        type:String
    },
    new_field_1:{
        type:String
    },
    new_field_2:{
        type:String
    },
    new_field_3:{
        type:String
    },
    new_field_4:{
        type:String
    },
    new_field_5:{
        type:String
    },
    new_field_6:{
        type:String
    },
    new_field_7:{
        type:String
    },
    new_field_8:{
        type:String
    },
    is_deleted:{
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const Quotation=mongoose.model('Quotation',Quotation_schema);



//Quotation Record 332
const Quotation_record_schema=mongoose.Schema({
    quotation_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Quotation',
            required:true 
    },
    product_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true 
    },
    new_field_1:{
        type:String
    },
    new_field_2:{
        type:String
    },	
    new_field_3:{
        type:String
    },	
    is_deleted:{
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const Quotation_record=mongoose.model('Quotation_record',Quotation_record_schema);


// Quotation Template 341 
const Quotation_Template_schema=mongoose.Schema({
   
    name:{
        type:String
    },
    description:{
        type:String
    },
    
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const Quotation_Template=mongoose.model('Quotation_Template',Quotation_Template_schema);


//Quotation Template Record 361
const Quotation_Template_Record_schema=mongoose.Schema({
    template_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Quotation_Template',
            required:true 
    },
    product_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true 
    },
    
    custom_no_1:{
        type:String
    },
    custom_no_2:{
        type:String
    },
    custom_no_3:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const Quotation_Template_Record=mongoose.model('Quotation_Template_Record',Quotation_Template_Record_schema);


// sales 377
const sales_schema=mongoose.Schema({
    customer_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'customer',
            required:true 
    },
    reference_number:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    total_bill:{
        type:Number
        
    },	
    total_paid:{
        type:Number
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const sales=mongoose.model('sales',sales_schema);


// sales records 393
const sales_records_schema=mongoose.Schema({
    sales_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'sales',
            required:true 
    },
    product_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sales',
        required:true 
    },
    quantity:{
        type:String,
        
    },	
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    }
})
const sales_records=mongoose.model('sales_records',sales_records_schema);


//sales payment 407

const sales_payment_schema=mongoose.Schema({
    sales_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'sales',
            required:true 
    },
    payment_method:{
        type:String,
        required:true
    },	
    amount:{
        type:Number
    },
    payment_date:{
        type:Date,
        required:true
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const sales_payment=mongoose.model('sales_payment',sales_payment_schema);


// sales return 424
const sales_return_schema=mongoose.Schema({
    customer_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'customer',
            required:true 
    },
    return_ref_no:{
        type:String,
        required:true
    },	
    return_date:{
        type:Date
    },
    total_bill:{
        type:Number
    },
    total_paid:{
        type:Number
    },
    
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const sales_return=mongoose.model('sales_return',sales_return_schema);

//sales return records 442

const sales_return_records_schema=mongoose.Schema({
    return_id_fk:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'sales_return',
            required:true 
    },
    product_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true 
    },
    batch_id_fk:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'batch',
    required:true 
    },
    return_quantity:{
        type:Number,
        required:true
    },	
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})
const sales_return_records=mongoose.model('sales_return_records',sales_return_records_schema);


//Expense Category
const expense_Category_Schema=mongoose.Schema({
    category_name:{
        type:String,
        required:true
    },	
    description:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date
    },
})   
const ExpenseCategory=mongoose.model('ExpenseCategory',expense_Category_Schema);

//Expense
const expense_Schema=mongoose.Schema({
    expense_cat_id_fk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ExpenseCategory',
        required:true
    },	
    amount:{
        type:Number
    },
    date:{
        type:Date
    },
    note:{
        type:String
    },
    is_deleted:{
    
        type:Boolean,
        default:false,
        required:true
    },
    created_by:{
        type:Number,
        required:true
    },
    updated_by:{
        type:Number
    },
    deleted_by:{
        type:Number
    },
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
       
    },
    deleted_at:{
        type:Date
    },
})   
const Expense=mongoose.model('Expense',expense_Schema);

module.exports={
    role,
    user,
    feature, 
    role_feature ,
    supplier,
    CustomerCategory,
    Customers,
    ProductCategory,
    Brand,
    Product,
    batch,
    po,
    po_record,
    purchase,
    purchase_record, 
    purchase_payment ,
    purchase_return,
    purchase_return_record,
    Quotation,
    Quotation_record,
    Quotation_Template,
    Quotation_Template_Record,
    sales,
    sales_records,
    sales_payment, 
    sales_return,
    sales_return_records,
    ExpenseCategory,
    Expense
}