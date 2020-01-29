// Define SubjectSchema.js
var mongoose = require('mongoose');
var SubjectSchema = new mongoose.Schema({
        subjectName:{
            type: String,
            required: true
        },
        subjectCode:{
            type: String,
            required: true,
        },
        subjectTopics:[{
            topicName:{
                type:String,
                required: true,
                
            },
            subjectTopicSubTopics:[{
                subTopicName:{
                    type:String,
                    required:true,
                },
                subTopicQuestions:[{
                    questionNumber:{
                        type: Number,
                        required: true,
                    },
                    questionAsk:{
                        type:String,
                        required:true,
                    },
                    
                }],
                subTopicExtraResources:[{
                    resourceName:{
                        type: String,
                        required: true,
                    },
                    resourceType:{
                        type: String,
                        required: true
                    },
                    resourceUrl:{
                        type: String,
                        required: true,
                    }

                }]
            }],
            subjectQuestions:[{
                questionNumber:{
                    type: Number,
                    required: true,
                },
                questionAsk:{
                    type:String,
                    required:true,
                },
            }],
            subTopicExtraResources:[{
                resourceName:{
                    type: String,
                    required: true,
                },
                resourceType:{
                    type: String,
                    required: true
                },
                resourceUrl:{
                    type: String,
                    required: true,
                }

            }]
        }]
})

var Subjects = module.exports = mongoose.model('Subjects', SubjectSchema);
