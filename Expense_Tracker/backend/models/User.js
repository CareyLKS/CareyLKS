const mongoose=require(`mongoose`);

const bcrypt=require("bcryptjs");

const UserSchema=new mongoose.Schema({
    fName: {type:String, required:true},
    email: {type:String, required:true},
    pwd:{type:String, required:true},
    proPicURL:{type:String, default:null},
},{timestamps:true});

//Hash pwd before save
UserSchema.pre('save', async function () {
    if (!this.isModified('pwd')) return;
    this.pwd = await bcrypt.hash(this.pwd,10);
});

//compare pwds
UserSchema.methods.comparePwd = async function (userPwd){
    return await bcrypt.compare(userPwd, this.pwd);
}

module.exports = mongoose.model('User', UserSchema);