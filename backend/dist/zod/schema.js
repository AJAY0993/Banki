"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Please provide a valid email" }),
    password: zod_1.z
        .string({ required_error: "Please provide password" })
        .min(8, "Password must be at least 8 characters long")
        .max(20, { message: "Password cannot be longer than 20 characters" }),
    username: zod_1.z.string().optional()
});
exports.signInInput = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is require" })
        .email({ message: "Please provide a valid email" }),
    password: zod_1.z
        .string({ required_error: "Please provide password" })
        .min(8, "Password must be at least 8 characters long")
        .max(20, { message: "Password cannot be longer than 20 characters" })
});
