

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


var schemaOptions = {
  toObject: {
    virtuals: true
  }  ,toJSON: {
    virtuals: true
  }
};


let Task = new Schema({
  Task_ID: {
    type: Number
  },  Task: {
    type: String,
    required: true
  },  Start_Date: {
    type: Date,
    default:null
  },  End_Date: {
    type: Date,
    default:null 
  },  Priority: {
    type: Number
  },  Status:{
    type: Number, 
    default:0
  },
  Parent: { type: Schema.Types.ObjectId, ref: 'ParentTask' },
  Project: { type: Schema.Types.ObjectId, ref: 'Project' },
  User: { type: Schema.Types.ObjectId, ref: 'User' }
},
schemaOptions,
{
    collection: 'tasks'
});

Task.plugin(autoIncrement, {inc_field: 'Task_ID'}); 

module.exports = mongoose.model('Task', Task);
