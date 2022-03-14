import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(conpassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    let user = this as UserDocument;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

UserSchema.methods.comparePassword = async function (
    conpassword: string): Promise<boolean> {
    let user = this as UserDocument;
    return await bcrypt.compare(conpassword, user.password)
        .then(() => true)
        .catch((e) => false);
}
const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;