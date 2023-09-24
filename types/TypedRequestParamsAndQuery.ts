import {Express} from "express";
import {Query} from "express-serve-static-core";

export interface TypedRequestParamsAndQuery<T extends Query, U> extends Express.Request {
     params: U,
     query: T
}
