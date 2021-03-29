const express = require('express');
const axios = require('axios');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

// allow cors for all endpoints
app.use(cors());

// endpoint '/.netlify/functions/[nama file]/' adalah default endpoint netlify function
app.get("/.netlify/functions/server/:id", async(req, res)=>{
    try {
        const data = {
            courier:"sicepat",
            waybill:req.params.id
        };
        
        const headers = {
            authorization:'GrysUgm9PPbGjYyV57Rt3DlKG1wpi3vqLnD22tgP',
            "accept": "application/json",
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        };

        const respon = await axios({
            method: "POST",
            url: "https://ruangapi.com/api/v1/waybill",
            data,
            headers
        });

        const json = respon.data;
        
        console.log(json.data.waybill)
        if(json.data.waybill.waybill_number){
            return res.send(json);
        }
        
        return res.json({
            statusCode:400,
            message:"resi tidak ditemukan"
        })

    } catch (err) {
        res.status(500).send(err);
    }
})

app.get("/*", async(req, res)=>{
    res.status(404).json({statusCode:404, message:"sepertinya kamu tersesat"})
})

module.exports.handler = serverless(app);
