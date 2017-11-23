import mongoose, {Schema} from 'mongoose';
import constants from '../../config/constants';

const PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    }
});

export default mongoose.model('posts', PostSchema);