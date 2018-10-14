var mongoose = require('mongoose')

var photoSchema=mongoose.Schema(
	{
		file_name : String,
		created : {
			type: Date, 
			default: Date.now
		},
		checked : {
			type : String
		},
		lat : Number,
		lng : Number
	});

module.exports=mongoose.model("Photo",photoSchema);