export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
}

export interface UserResponse {
    id: number;
    username: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    expiresAt: string;
    user: UserResponse;
}