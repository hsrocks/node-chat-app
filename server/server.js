const path = require('path');
const express = require('express');
const app = express();
const publicPath =path.join(__dirname , '../public');
const port = process.env.PORT || 3000
app.use(express.static(publicPath));
console.log(publicPath);
app.listen(port,()=>{
  console.log('Application listening on port ', port);
})
