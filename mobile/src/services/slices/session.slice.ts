import { ImageRequireSource, ImageURISource } from "react-native";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Interesets } from "@interfaces/anime";
import { Session } from "@interfaces/session";

const initialState: Session = {
  user: {
    id: 1,
    preferred_interesets: [],
    firstName: null,
    nickName: null,
    email: null,
    picture: null,
    banner:
      "https://firebasestorage.googleapis.com/v0/b/mangashow-b8f81.appspot.com/o/banners%2Fdemon-slayer.webp?alt=media&token=15eccae3-c864-4246-b42d-181cbe3cbeb7",
  },
  oauth: false,
  oauth_type: undefined,
  token: null,
  boarding: false,
  theme: "light",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setInteresets: (state: Session, action: PayloadAction<Interesets[]>) => {
      state.user.preferred_interesets = action.payload;
    },
    setLoginWithOAuth: (state: Session, action: PayloadAction<Session>) => {
      const { user, oauth, oauth_type, token } = action.payload;

      state.user = user;
      state.oauth = oauth;
      state.oauth_type = oauth_type;
      state.token = token;
    },
    setBannerUser: (state: Session, action: PayloadAction<string>) => {
      state.user.banner = action.payload;
    },
    setAvatarUser: (state: Session, action: PayloadAction<string>) => {
      state.user.picture = action.payload;
    },
    setOnboardingEnded: (state: Session) => {
      state.boarding = true;
    },
    reset: (state: Session) => {
      state = initialState;
    },
  },
});

export const {
  setInteresets,
  setBannerUser,
  setLoginWithOAuth,
  setAvatarUser,
  setOnboardingEnded,
  reset,
} = sessionSlice.actions;

export default sessionSlice.reducer;
