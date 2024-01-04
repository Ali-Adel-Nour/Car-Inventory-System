const http = require('http');


const app = require('./app');


const PORT = process.env.PORT || 6000


const server = http.createServer(app)


server.listen(PORT,()=>{
  console.log(`Server is Running on port ${PORT}`);
});
