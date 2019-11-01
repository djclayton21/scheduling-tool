const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressJwt = require('express-jwt')
require('dotenv').config();
const PORT = process.env.PORT || 6565;

//universal middleware
app.use(express.json());
app.use(morgan('dev'));


//connect to DB
mongoose.connect('mongodb://localhost:27017/schedulingdb', 
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    },() => console.log('connected to DB'));

//routes
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', expressJwt({secret: process.env.SECRET}));
app.use('/api/jobs', require('./routes/jobRouter.js'));
app.use('/api/employees', require('./routes/employeeRouter.js'));
app.use('/api/shifts', require('./routes/shiftRouter.js'));

//error handling
app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === 'UnauthorizedError'){
        res.status(err.status);
    }
    return res.send({errMsg: err.message});
})
//listen

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));