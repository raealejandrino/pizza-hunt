const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const PizzaSchema = new Schema({
        pizzaName: {
            type: String,
            required: true,
            // required: 'You need to provide a pizza name!'
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    // return this.comments.length;

    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;




// const developers = [
//     {
//       name: "Eliza",
//       experience: 7,
//       role: "manager"
//     },
//     {
//       name: "Manuel",
//       experience: 2,
//       role: "developer"
//     },
//     {
//       name: "Kim",
//       experience: 5,
//       role: "developer"
//     }
//   ];
  
//   function calculateAverage(total, years, index, array) {
//     total += years;
//     return index === array.length-1 ? total/array.length: total
//   }
  
//   const average = developers.map(dev => dev.experience).reduce(calculateAverage);

// In this case, map grabs just the years of experience from each developer. Then .reduce() is used to continually add on to a value within the scope of the method known as the accumulator, then divide by the length of the entire array. The built-in .reduce() method is great for calculating a value based off of the accumulation of values in an array.