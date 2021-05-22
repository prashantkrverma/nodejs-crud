const CONFIG = require('./config');
const mongoose = require("mongoose")
const { NODE_ENV } = process.env

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(CONFIG.development.mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

module.exports = mongoose;