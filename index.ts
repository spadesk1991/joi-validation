import * as joi from "joi";
import _ from 'lodash'

interface AnyObject {
  [propName: string]: any
}


export async function validation(ctx: any, schema: Object) {
  const pickedCtx: AnyObject = {};
  const mappings: AnyObject = {
    query: "request.query",
    header: "request.header",
    body: "request.body"
  }
  Object.keys(schema).forEach(k => {
    pickedCtx[k] = _.get(ctx, (mappings[k] || k) || {});
  })
  try {
    const newCtx = await joi.validate(pickedCtx, schema, {
      abortEarly: false,
      allowUnknown: true
    });
    Object.keys(newCtx).forEach(k => {
      joi.extend(_.get(ctx, (mappings[k] || k) || {}), newCtx[k]);
    });
  } catch (error) {
    ctx.throw(406, { message: error.datils.map((d: any) => `[${d.path}:${d.message}]`).join(" ") });
  }
}




