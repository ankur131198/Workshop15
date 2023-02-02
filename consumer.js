const amqp=require('amqplib');
connect();
async function connect()
{
    try{
       const connection=await amqp.connect("amqp://127.0.0.1:5672");
       const channel=await connection.createChannel();
       const result= await channel.assertQueue("jobs");
       channel.consume("jobs",message=>{
        const input=JSON.parse(message.content.toString());
        console.log(`Received job with input ${input.number}`);
       })
        console.log("Waiting for the messages");
    }catch(error){
        console.error(error)
    }
}