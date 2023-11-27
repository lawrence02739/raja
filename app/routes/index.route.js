const userRoute=require('../routes/user.route')
const init=(app)=>{
    app.use('/api/v1',userRoute)
}

module.exports={
    init:init
}