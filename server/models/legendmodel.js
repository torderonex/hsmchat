const {Schema,model} = require('mongoose');

const LegendSchema = new Schema({
    author:{type: Schema.Types.ObjectId, ref: 'User'},
    copyright:{type:String, required:true},
    body:{type:String, required:true},
    
})

module.exports = model('Legend', LegendSchema);