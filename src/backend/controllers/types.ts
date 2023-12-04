import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

export type GetRequest<ReqQuery = {}> = ExpressRequest<
  unknown,
  unknown,
  unknown,
  ReqQuery
>;

export type UserGetRequest<ReqQuery = {}> = ExpressRequest<
  unknown,
  unknown,
  unknown,
  ReqQuery
>;

export type PostRequest<ReqBody = {}, ReqQuery = {}> = ExpressRequest<
  unknown,
  unknown,
  ReqBody,
  ReqQuery
>;

export type CustomResponse<ResBody = never> = ExpressResponse<ResBody>;

export type UserResponse<ResBody = never> = ExpressResponse<
  ResBody,
  { username: string }
>;
