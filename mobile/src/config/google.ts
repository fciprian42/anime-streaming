export const googleConfig = {
  scopes: [], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '239035370766-hikjom69fr28m2mibqp3j3iqekr3d11c.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '239035370766-dsgu11hq0jetq6je2oq0ipbvr3jgkkjd.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  profileImageSize: 100, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
};
