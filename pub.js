const express = require('express');
const redis = require('redis');

const app = express();

let publisher = redis.createClient({
    url:'redis://localhost:6379'
})

publisher.on('error', (err)=> console.log('err',err));
publisher.on('connect', (err)=> console.log('Redis Connected'));

const connect = async ()=>{
    await publisher.connect();
}
connect();

app.get('/publish',async (req,res)=>{
    const id = Math.floor(Math.random()*10);
    const data = {
        id,
        message:` message- ${id}` 
    }

    await publisher.publish('message',JSON.stringify(data));
    res.status(200).json({
        message:'message is successfully published'
    })
    // await publisher.publish('message',JSON.stringify(data));
})


app.listen(3001,()=>{
    console.log('publisher server start on port 3001 ');
})