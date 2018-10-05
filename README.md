# joi-validation
joi validator

## demo
```js
const {validation,joi}=require("joi-validation");
const joi =require("joi");
router.get("/",async ctx=>{
  await validation(ctx,{
    query:{
      skip:joi.string().required(),
      limit:joi.string().required()
    }
  });
  ctx.status =200,
  ctx.body="hello world!"
});
```