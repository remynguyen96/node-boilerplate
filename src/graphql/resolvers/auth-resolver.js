import Auth from '../../modules/auth/auth.model';

export default {
    getAuth: async(_, args) => {
        try {
            return Auth.find({}).sort({createdAt: -1})
        } catch(err) {
            throw err;
        }
    }
}
