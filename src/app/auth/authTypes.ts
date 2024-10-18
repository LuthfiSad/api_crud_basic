export interface RegisterAuthBodyDTO {
  id?: string
  email?: string
  password?: string
  name?: string
  image?: string
}

export interface LoginAuthBodyDTO {
  email: string
  password: string
}

export interface LoginAuthResponse {
  access_token: string
}