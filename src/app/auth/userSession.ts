import { AppConfig, showConnect, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export const getUserSession = () => userSession;

export const authenticate = () => {
    showConnect({
      appDetails: {
        name: "App",
        icon: "/icon.png",
      },
      redirectTo: "/",
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  };
  
export const signOut = () => {
  userSession.signUserOut(window.location.origin);
};
