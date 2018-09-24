const joi = require("joi");
const _ = require('lodash');

async function validation(ctx, schema) {
  const pickedCtx = {};
  const mappings = {
    query: "request.query",
    header: "request.header",
    body: "request.body",
  };
  Object.keys(schema).forEach((k) => {
    pickedCtx[k] = _.get(ctx, mappings[k] || k) || {};
  });
  try {
    const newCtx = await joi.validate(pickedCtx, schema, {
      abortEarly: false,
      allowUnknown: true
    });
    Object.keys(newCtx).forEach((k) => {
      _.extend(_.get(ctx, mappings[k] || k) || {}, newCtx[k]);
    });
  } catch (err) {
    ctx.throw(406, { message: err.details.map(d => ` [${d.path}:${d.message}]`).join(" ") });
  }
}


exports.validation = validation;
exports.joi = joi;
exports._ = _;