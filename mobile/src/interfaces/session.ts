import { Interesets } from "@interfaces/index";

export type UserSession = {
  id: number;
  preferred_interesets: Interesets[] | [];
  firstName: string | null | undefined;
  nickName: string | null | undefined;
  email: string | null | undefined;
  picture: string | undefined;
  banner: string | null | undefined;
};

export interface Session {
  user: UserSession;
  boarding: boolean;
  theme: "dark" | "light";
  oauth: boolean;
  oauth_type: "facebook" | "google" | "apple" | undefined;
  token: string | null;
}
