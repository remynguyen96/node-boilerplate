import { hashSync, compareSync } from 'bcrypt-nodejs';

export function hashStr(str) {
    return hashSync(str);
}

export function compareStr(str, strCompare) {
    return compareSync(str, strCompare)
}