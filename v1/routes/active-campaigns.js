const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/',function(req,res){
axios.get("https://testapi.donatekart.com/api/campaign",{headers:{'Content-Type': 'application/json'}})
.then(function(response){
    var responseData=response.data;
     var filterData=responseData.filter(function(item){
         var now_timestamp=new Date().getTime();
         var onemonth_back_timestamp=now_timestamp-30*24*60*60*1000;
         var onemonth_back_date=new Date(onemonth_back_timestamp);
         var onemonth_back_iso_date=onemonth_back_date.toISOString();
        return (item.endDate>new Date() && onemonth_back_iso_date<item.created && item.created<new Date());
    })
    if(filterData.length===0)
         res.status(response.status).send({"message":"There are no active campaigns","campaigns":[]});
     else
        res.status(response.status).send(filterData);
}).catch(function(err){
    console.log(err);
    res.send({"status":err.response.status,"message":err.response.data});
})
})

module.exports =router;