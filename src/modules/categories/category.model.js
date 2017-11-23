import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
import constants from '../../config/constants';

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validate(title) {
                const regx = /^[^(!@#$%^&*()_.,<>?'";)]{5,60}$/g;
                return regx.test(title);
            },
            message: '{VALUE} is not valid. Please check {VALUE} again !'
        }
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validate(slug) {
                const regx = /^[^(!@#$%^&*()_.,<>?'";)]{5,60}$/g;
                return regx.test(slug);
            },
            message: '{VALUE} is not valid. Please check {VALUE} again !'
        }
    },
    description: {
        type: String,
        validate: {
            validate(desc) {
                if(desc.length > 1000) {
                    return false;
                }
                return true;
            },
            message: '{VALUE} is not valid !'
        }
    }
}, {timestamps: true});

CategorySchema.plugin(uniqueValidator, {
    message: '{VALUE} already taken !'
});

CategorySchema.methods = {
    toJS() {
       return {
           _id: this._id,
           title: this.title,
           slug: this.slug,
           description: this.description,
           // createdAt:
       }
    }
};

export  mongoose.model('categories', CategorySchema);