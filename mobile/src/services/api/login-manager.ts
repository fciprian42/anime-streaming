import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';

export const LoginFacebookManager = async (cb: (token: any) => void) => {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    async function (result) {
      if (!result.isCancelled) {
        const token = await AccessToken.getCurrentAccessToken();
        cb(token);
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
};

export const LoginGoogleManager = async (cb: (user: User) => void) => {
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();

    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
};
