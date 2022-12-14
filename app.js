const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const https = require("https") ;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));
app.get("/",function( req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const mailid = req.body.email;
    const fname = req.body.FirstName;
    const lastname = req.body.LastName;
    const url= "https://us17.api.mailchimp.com/3.0/lists/0cfd3d9512" ;
    let data = {
        members : [{
            email_address:mailid,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lastname
            }
        }]
    }
    const options = {method:"POST",auth:"harshR:f78c7983262d08e6717f57cc1b4ef632-us17"}
    const jsondata = JSON.stringify(data);
     const request = https.request(url,options,function(response){
       response.on("data",function(data){
        console.log(JSON.parse(data));
        if (response.statusCode===200){
          
                res.sendFile(__dirname+"/success.html");
            
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
       }) 
    })
    request.write(jsondata);
    
    request.end();  
})
app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT||3000,function(){
    console.log("The server is started at node 3000 ");
})
// f78c7983262d08e6717f57cc1b4ef632-us17
// 0cfd3d9512