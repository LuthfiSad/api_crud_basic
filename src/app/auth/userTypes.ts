import { Role } from "../user/userTypes"

export interface RegisterAuthBodyDTO {
  email: string
  password: string
  name: string
  role?: Role
  image: string
}

export interface LoginAuthBodyDTO {
  email: string
  password: string
}

export interface LoginAuthResponse {
  access_token: string
}

export interface TokenDecodeInterface{
  id: string
}