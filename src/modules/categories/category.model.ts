import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(title: string) {
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
      validator(slug: string) {
        const regx = /^[^(!@#$%^&*()_.,<>?'";)]{5,60}$/g;
        return regx.test(slug);
      },
      message: '{VALUE} is not valid. Please check {VALUE} again !'
    }
  },
  description: {
    type: String,
    validate: {
      validator(desc: string) {
        if (desc.length > 1000) {
          return false;
        }
        return true;
      },
      message: '{VALUE} is not valid !'
    }
  }
}, {
  timestamps: true
});

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

const Categories = model('categories', CategorySchema); 

export {
  Categories
};