import axios from "axios";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth";

const API_BASE_URL = "http://localhost:8080";

export async function login(username: string, password: string): Promise<LoginResponse> {
    const request: LoginRequest = {
        username: username,
        password: password
    }
    
    const response = await axios.post(API_BASE_URL + "/login", request)

    return response.data
}

export async function register(request: RegisterRequest): Promise<RegisterRequest> {

}