const express = require("express")
const mainRouter = require("./routes/main")
const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors())
app.use('/api/v1', mainRouter)





app.listen(3000)