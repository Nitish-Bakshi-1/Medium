"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().min(5).max(50).email().trim(),
    password: zod_1.z.string().min(8).max(50).trim(),
    name: zod_1.z.string().optional(),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().min(5).max(50).email().trim(),
    password: zod_1.z.string().min(8).max(50).trim(),
    name: zod_1.z.string().optional(),
});
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(5),
    content: zod_1.z.string().min(10),
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(5).optional(),
    content: zod_1.z.string().min(10).optional(),
});
