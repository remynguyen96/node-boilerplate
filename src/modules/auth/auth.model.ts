import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import { constants } from '../../config/constants';

const AuthSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(name: string) {
        const Regex = /^(?!.*[!@#$%^&*()_+=])(?!.*[0-9])[a-zA-Z].{3,30}$/g;
        return Regex.test(name);
      },
      message: '{VALUE} is not valid !',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(email: string) {
        const Regex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return Regex.test(email);
      },
      message: '{VALUE} is not a valid !',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator(password: string): any {
        return password.length >= 4 && password.match(/\d+/g);
        // /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{5,35}$/g
      },
      message: '{VALUE} is invalid !',
    },
  },
  token: {
    type: String,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

AuthSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken !',
});

AuthSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashStr(this.password);
    return next();
  }
  return next();
});

AuthSchema.statics.findByName = function (name: string, cb: any) {
  console.log(this);
  this.find({
    name: new RegExp(name, 'i'),
  }, cb);
};

AuthSchema.methods = {
  // _hashPassword(password) {
  //     return hashSync(password);
  // },
  _comparePassword(password: string) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({
        _id: this._id,
      },
      constants.JWT_SECRET, {
        expiresIn: '5m',
      }
    );
  },
  toAuthJson() {
    return {
      token: this.createToken(),
      ...this.toJSON(),
    };
  },
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      verified: this.verified,
    };
  },
};

function hashStr(str: string): string {
  return hashSync(str);
}

function compareStr(str: string, strCompare: string): boolean {
  return compareSync(str, strCompare);
}

const Auth = model('auth', AuthSchema); 

export {
  Auth,
  hashStr,
  compareStr,
};
