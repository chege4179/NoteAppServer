import {TypedRequestBody} from "../../types/TypedRequestBody";
import {z} from "zod"
import {BaseResponse} from "../../types/BaseResponse";
import {Response} from "express";

const LoginSchema = z.object({
     email:z.string(),
     password:z.string()
})

type LoginBody = z.infer<typeof LoginSchema>
interface ResponseBody extends BaseResponse {
     user:User | null
}
const loginUser = async (req: TypedRequestBody<any>, res:Response<ResponseBody>) => {
     try {

     } catch (e) {

     }
}

export default loginUser
