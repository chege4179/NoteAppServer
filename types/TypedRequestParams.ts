import {Express} from "express";

export interface TypedRequestParams<T> extends Express.Request {
     params: T
}
