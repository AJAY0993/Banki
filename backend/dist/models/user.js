"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        select: false
    },
    profilePic: { type: String, default: "api.dicebear.com/7.x/bottts/png" }
}, {
    timestamps: true
});
userSchema.methods.validatePassword = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hashPassword);
});
userSchema.methods.hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew || this.isModified("password")) {
            console.log("from mifl");
            this.password = yield bcrypt_1.default.hash(this.password, 12);
        }
        next();
    });
});
const getUser = () => UserModel.find();
exports.getUser = getUser;
const getUserById = (id) => UserModel.findById(id);
exports.getUserById = getUserById;
const getUserByEmail = (email) => UserModel.findOne({ email: email }).exec();
exports.getUserByEmail = getUserByEmail;
const createUser = (user) => UserModel.create(user);
exports.createUser = createUser;
const deleteUserById = (id) => UserModel.findByIdAndDelete(id);
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => UserModel.findByIdAndDelete(id);
exports.updateUserById = updateUserById;
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
