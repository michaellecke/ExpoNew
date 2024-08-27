module.exports = ({ config }) => {
    const EXPO_PUBLIC_IS_UAT = process.env.EXPO_PUBLIC_BUILD_ENV !=='prod' ?? true; // Default to UAT when the process.env.EXPO_PUBLIC_BUILD_ENV is undefined
    // test using: EXPO_PUBLIC_BUILD_ENV=uat npx expo install --check 
    // If EXPO_PUBLIC_BUILD_ENV is undefined (no prefix in the command), we will default to DEV, aka UAT mode. 
    // To see what happens when EXPO_PUBLIC_BUILD_ENV is undefined, test using: npx expo install --check
    // THUS ONLY prefixing the build commands with EXPO_PUBLIC_BUILD_ENV=prod will build to production. See package.json
  
    const buildVersion = `${config.version.replaceAll(".", "")}${config.extra.buildVersion}`
    // switch out the app icon and other properties to further differentiate the app on your device.
    config.name = EXPO_PUBLIC_IS_UAT ? 'JanneyDev' : 'Janney';
    config.extra.environment = EXPO_PUBLIC_IS_UAT ? 'uat' : 'prod';  // this will set the URLS in the app!
    config.icon = EXPO_PUBLIC_IS_UAT ? "./assets/devicon.png" : "./assets/icon.png";
    config.web.favicon = EXPO_PUBLIC_IS_UAT ? "./assets/devicon.png" : "./assets/icon.png";
    config.android.icon = EXPO_PUBLIC_IS_UAT ? "./assets/devAndroidIcon.png" : "./assets/androidIcon.png";
    // config.android.adaptiveIcon.foregroundImage = EXPO_PUBLIC_IS_UAT ? "./assets/devAndroidIcon.png" : "./assets/androidIcon.png";
    config.android.backgroundColor = EXPO_PUBLIC_IS_UAT ? "#FF0000" : "#266796";
    config.splash.image = EXPO_PUBLIC_IS_UAT ? "./assets/devsplash.png" : "./assets/splash.png";
    config.splash.backgroundColor = EXPO_PUBLIC_IS_UAT ? "#FF0000" : "#266796";
    config.androidStatusBar.backgroundColor = EXPO_PUBLIC_IS_UAT ? "#FF0000" : "#266796";
    config.android.versionCode = Number(buildVersion);
    // So: the app version , ie, 3.1.2, with dots removed plus the build number. 3121.
    // Apple typically uses dot notation numbers for buildNumber, ie 1.1.0, but it can be a single digit, too. Let's keep them in sync.
    config.ios.buildNumber = buildVersion;
    config.ios.bundleIdentifier = EXPO_PUBLIC_IS_UAT ? "com.JMS.MyJanney.dev" : "com.JMS.MyJanney"
    config.ios.googleServicesFile = EXPO_PUBLIC_IS_UAT ? "./GoogleService-Info-dev.plist" : "./GoogleService-Info.plist"
    config.android.package = EXPO_PUBLIC_IS_UAT ? "com.Janney.MyJanney.dev" : "com.Janney.MyJanney"
    config.android.googleServicesFile = EXPO_PUBLIC_IS_UAT ? "./google-services-dev.json": "./google-services.json"
    
    // console.log("Are we in UAT mode? ", EXPO_PUBLIC_IS_UAT);
    // console.log("What is the process.env.EXPO_PUBLIC_BUILD_ENV?", process.env.EXPO_PUBLIC_BUILD_ENV);
    // console.log("Config name: " ,config.name); 
    // console.log("config: ", config)
    return {
      ...config,
    };
  };