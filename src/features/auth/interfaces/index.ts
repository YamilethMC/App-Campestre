import { UserProfile } from "../../../interfaces";
export * from "./login.interface";

export interface userProfile extends UserProfile {
    token: string;
    refreshToken: string;
    expiresAt: Date;
    mustChangePassword?: boolean;
}