"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signout = exports.signin = exports.signup = void 0;
const user_1 = __importStar(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_1.getUserByEmail)(req.body.email);
        if (user) {
            return res.status(400).json({
                status: "failed",
                message: "Email already exist"
            });
        }
        const newUser = yield (0, user_1.createUser)(req.body);
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "30 days"
        });
        res.cookie("jwt", token, {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: true,
            sameSite: "none"
        });
        res.status(201).json({
            status: "success",
            message: "Signed up successfully"
        });
    }
    catch (error) {
        return res.json({
            status: "error",
            message: "something went wrong"
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const user = yield user_1.default.findOne({ email }).select({
            username: true,
            password: true,
            email: true
        });
        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "incorrect email or password"
            });
        }
        if (!(yield user.validatePassword(password, user.password))) {
            return res.status(401).json({
                status: "failed",
                message: "incorrect email or password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "", {
            expiresIn: "30 days"
        });
        res.cookie("jwt", token, {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: true,
            sameSite: "none"
        });
        res.status(201).json({
            status: "success",
            message: "Signed in successfully",
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: "something went wrong",
            error
        });
    }
});
exports.signin = signin;
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: true,
            sameSite: "none"
        });
        res.status(201).json({
            status: "success",
            message: "Signed out successfully"
        });
    }
    catch (error) {
        return res.json({
            status: "error",
            message: "something went wrong"
        });
    }
});
exports.signout = signout;
