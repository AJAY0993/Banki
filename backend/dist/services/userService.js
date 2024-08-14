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
exports.validatePassword = exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getUser = void 0;
//@ts-nocheck
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
// migrate and generate
const prisma = new client_1.PrismaClient();
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany();
});
exports.getUser = getUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { id }
    });
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { email }
    });
});
exports.getUserByEmail = getUserByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield hashPassword(user.password);
    return yield prisma.user.create({
        data: Object.assign(Object.assign({}, user), { password: hashedPassword })
    });
});
exports.createUser = createUser;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.delete({
        where: { id }
    });
});
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => __awaiter(void 0, void 0, void 0, function* () {
    if (values.password) {
        values.password = yield hashPassword(values.password);
    }
    return yield prisma.user.update({
        where: { id },
        data: values
    });
});
exports.updateUserById = updateUserById;
// Password handling
const validatePassword = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hashPassword);
});
exports.validatePassword = validatePassword;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 12);
});
