import {hashSync, compareSync} from 'bcrypt-nodejs';

export const hashStr = (str) => hashSync(str);
export const compareStr = (str, strCompare) => compareSync(str, strCompare);
