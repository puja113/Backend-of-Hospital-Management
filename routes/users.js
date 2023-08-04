const express=require('express');
const router=express.Router();
const db=require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt=require('jsonwebtoken')
const mailer=require('nodemailer')
const key='Puja Pandey'
//Login
router.get('/login', async(req,res)=>{
    console.log(req.body)
    const{email, password} = req.body
     try{
        const data=await db.user.find({email:email})
        if(data.length==0){
            res.status(404).json({status:false, data:"email is wrong"})
        }
        else{
            const salt = await bcrypt.genSalt(saltRounds); 
            const hashedPassword1 = await bcrypt.hash(password, salt);
            
            const comnare=await bcrypt.compare(password,hashedPassword1);
            if(comnare){
                const user={
                    email:email,
                    user_code:data[0].user_code,
                    password:password
                }
                const token = jwt.sign(user , key, { expiresIn: '1m' }); 
                res.status(200).json({status:true, data:{
                    userid:data[0].user_code,
                    accessToken:token
                }})
            }
            else{
                res.status(200).json({status:false, data:"Failed"})
            }
        }
    }
       catch (error) {
        console.log(error)
        }
})
router.post('/ResetPassword', async(req,res)=>{
   

    const{userid,authentication}=req.headers
    const{currentPassword,newPassword}=req.body
    const salt = await bcrypt.genSalt(saltRounds);   
    try{
        const data= await db.user.find({user_code:parseInt(userid)});
        if(data.length==0){
            res.status(404).json({status:false, data:"user is wrong"})
        }
        else{
            
            const comnare=await bcrypt.compare(currentPassword,data[0].password);
            console.log(comnare)
            if(comnare){
                
                const hashedPassword1 = await bcrypt.hash(newPassword, salt);
                const data1=await db.user.updateOne({user_code:parseInt(userid)},{password:hashedPassword1});
                res.status(200).json({status:true, data:"Updated"})
            }
            else{
                res.status(200).json({status:false, data:"Failed"})
            }
            
            
            
        }
    } catch(error){
        console.log(error)
      }
})
router.post('/ForgetPassword', async(req,res)=>{
    const {email}=req.body;
    try {
        const data=await db.user.find({email:email})
        if(data.length!=0){
            //connection
            var transporter = mailer.createTransport({
                host: "smtp.yandex.com",
                port: 465,
                secure: true,
                auth: {
                  user: 'ayush.agarwal@geniateq.com',
                  pass: 'Ayush@123456'
                }
            });
            var k=Math.floor(Math.random() * 1000000);

            //Format
            const GTdetails = {
                from: 'ayush.agarwal@geniateq.com',
                to: email,
                subject: 'OTP',
                text:`please don't disclose the Otp- ${k}`
            };
            //send mail
            transporter.sendMail(GTdetails, (err, info) => {
                if(err){
                    throw err;
                }
                else{
                    console.log("Email sent")
                    res.status(200)
                }
            })
        }
    } catch (error) {
        
    }
})


//Users
router.get('/GetAllUsers',async(req,res)=>{
    var my_data=[]
    try{
        const data=await db.user.find({is_deleted:false})
        for(let i=0;i<data.length;i++){
            var obj={userId:data[i]._id,roleId:data[i].role_id_fk,name:data[i].name,password:data[i].password,address:data[i].address, emailId:data[i].email,contactNo_1:data[i].contact_no_1 ,contactNo_2:data[i].contact_no_2 ,contactNo_3:data[i].contact_no_3,userCode:data[i].user_code}
            my_data.push(obj)

        }
        res.status(200).json({status:true,data:my_data})

    }
    catch(error){
        console.log(error)
    }


})
router.get('/GetUserById',async(req,res)=>{
    const userId=req.body.userId

    try{
        const data=await db.user.find({_id:userId})
        var obj={userId:data[0]._id,roleId:data[0].role_id_fk,name:data[0].name,password:data[0].password,address:data[0].address, emailId:data[0].email,contactNo_1:data[0].contact_no_1 ,contactNo_2:data[0].contact_no_2 ,contactNo_3:data[0].contact_no_3,userCode:data[0].user_code}
        res.status(200).json({status:true, data:obj})
    }
    catch(error){
        console.log(error)
    }

})
router.post('/AddUser',async(req,res)=>{
    console.log(12312)
    const {roleId,name,password,address, email,contactNo_1 ,contactNo_2 ,contactNo_3,userCode}=req.body
    const{userid,authentication}=req.headers

    try{
        const data= await db.user.create({role_id_fk:roleId,name:name,password:password,address:address,email:email,contact_no_1:contactNo_1,contact_no_2:contactNo_2,contact_no_3:contactNo_3,created_by:userid,created_at:Date.now(),user_code:userCode})
        res.status(200).json({status:true,data:data})
    }
    catch(error){
        console.log(error)
    }

})

router.put('/UpdateUser',async(req,res)=>{
    const {roleId,name,password,address, email,contactNo_1 ,contactNo_2 ,contactNo_3,userCode,userId}=req.body
    const{userid,authentication}=req.headers

    try{
        const data= await db.user.updateOne({_id:userId},{role_id_fk:roleId,name:name,password:password,address:address,email:email,contact_no_1:contactNo_1,contact_no_2:contactNo_2,contact_no_3:contactNo_3,updated_by:userid,updated_at:Date.now(),user_code:userCode})
        res.status(200).json({status:true,data:data})
    }
    catch(error){
        console.log(error)
    }

})
router.delete('/DeleteUser',async(req,res)=>{
    const userId =req.body.userId
    const deleted_by=req.headers.userid

    try{
        const data= await db.user.updateOne({_id:userId},{
            is_deleted:true,deleted_by:parseInt(deleted_by),deleted_at:Date.now()
        });
        res.status(200).json({status:true,data:data})
    }
    catch(error){
        console.log(error)
    }

})



//Roles
router.get('/Role/GetAllRoles', async(req,res)=>{
    var my_data=[]

    try{
         const data= await db.role.find({is_deleted:false});
         console.log(data)
         for(let i=0;i<data.length;i++){
            var obj={roleId:data[i]._id,roleName:data[i].role_name};
            my_data.push(obj);
         }
         res.status(200).json({status:true,data:my_data})
    }
    catch(error){
        console.log(error)
    }

})
router.get('/Role/GetRoleById',async(req,res)=>{
    const{roleId}=req.body
    var myFeature=[]
    try{
        const data= await db.role.find({_id:roleId});
        const data1= await db.role_feature.find({role_id_fk:roleId})
        for(let i=0;i<data1.length;i++){
            var feature_table=await db.feature.find({_id:data1[i].feature_id_fk});
            var obj={
                featureId: feature_table[0]._id,
                featureName:feature_table[0].feature_name,
                view:data1[i].view_perm,
                add:data1[i].add_perm ,
                edit: data1[i].edit_perm,
                delete:data1[i].delete_perm
            }
     myFeature.push(obj);
        }
        var FinalData={roleId:roleId,roleName:data[0].role_name,description:data[0].description,features:myFeature};
        res.status(200).json({status:true,data:FinalData})
    } catch (error) {
        console.log(error)
        }
            
        
    

}) 
router.post('/Role/AddRole',async(req,res)=>{
    const{roleName,description}=req.body
    const{features}=req.body
    const {userid,authentication}=req.headers

    try{
        const roleEntry = await db.role.create({
            role_name:roleName,desription:description, created_by:parseInt(userid),created_at:Date.now()})
            console.log(roleEntry)
            try{

                for(let i=0;i<features.length;i++){
                    const featureEntry= await db.role_feature .create({
                        role_id_fk:roleEntry._id, feature_id_fk:features[i].featureId,view_perm:features[i].view,add_perm:features[i].add,edit_perm:features[i].edit,
                        delete_perm :features[i].delete,created_by:parseInt(userid),created_at:Date.now()
                    })
                }
                res.status(200).json({status:true})

        
            }
            catch(error){
                console.log(error)
            }
        } catch(error){
              console.log(error)
            }
        
    })

router.put('/Role/UpdateRole',async(req,res)=>{
    const{roleName,description,roleId}=req.body
    const{features}=req.body
    const {userid,authentication}=req.headers

    try{
        const roleEntry = await db.role.updateOne({_id:roleId},{
            role_name:roleName,desription:description, created_by:parseInt(userid),created_at:Date.now()})
            console.log(roleEntry)
            try{

                for(let i=0;i<features.length;i++){
                    const featureEntry= await db.role_feature .updateOne({
                        role_id_fk:roleId, feature_id_fk:features[i].featureId,view_perm:features[i].view,add_perm:features[i].add,edit_perm:features[i].edit,
                        delete_perm :features[i].delete,updated_by:parseInt(userid),updated_at:Date.now()
                    })
                }
                res.status(200).json({status:true})

        
            }
            catch(error){
                console.log(error)
            }
        } catch(error){
              console.log(error)
            }

})
router.delete('/Role/DeleteRole',async(req,res)=>{

    const{roleId}=req.body
    const{userid}=req.headers

    try{
        const roleEntry= await db.role.updateOne({_id:roleId},{
            is_deleted:true,deleted_by:userid,deleted_at:Date.now()
        })

        console.log(roleEntry)

        try{
            const featureEntry= await db.role_feature.updateMany({role_id_fk:roleId},{is_deleted:true,deleted_by:userid,deleted_at:Date.now()})
            res.status(200).json({status:true})
        }
        catch(error){console.log(error)
        }
    }
    catch(error){console.log(error)}

})




















module.exports=router;