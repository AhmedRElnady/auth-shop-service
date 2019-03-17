const mongoose = require('mongoose');

const shopScheam = new mongoose.Schema({ /// i make it a one way embedding with customer service
    title : {
        type: String,
        trim: true,
        required: true
    },
    subscribersNumber: {
        type: Number,
        default: 0
    },
    description:{
        type: String
    }
}, {timestamps: true });

shopScheam.set('toJSON', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id;

        delete ret.deleted;
        delete ret._id;
        delete ret.__v;
    }
})


const Shop = mongoose.model('Shop', shopScheam);

module.exports = Shop;
