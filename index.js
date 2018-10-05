"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = __importStar(require("joi"));
exports.joi = joi;
const lodash_1 = __importDefault(require("lodash"));
exports._ = lodash_1.default;
async function validation(ctx, schema) {
    const pickedCtx = {};
    const mappings = {
        query: "request.query",
        header: "request.header",
        body: "request.body"
    };
    Object.keys(schema).forEach(k => {
        pickedCtx[k] = lodash_1.default.get(ctx, (mappings[k] || k) || {});
    });
    try {
        const newCtx = await joi.validate(pickedCtx, schema, {
            abortEarly: false,
            allowUnknown: true
        });
        Object.keys(newCtx).forEach(k => {
            lodash_1.default.extend(lodash_1.default.get(ctx, (mappings[k] || k) || {}), newCtx[k]);
        });
    }
    catch (error) {
        ctx.throw(406, { message: error.details.map((d) => ` [${d.path}:${d.message}]`).join(" ") });
    }
}
exports.validation = validation;
//# sourceMappingURL=index.js.map