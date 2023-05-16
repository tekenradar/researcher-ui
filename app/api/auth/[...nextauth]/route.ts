import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { Provider } from "next-auth/providers"
import { initializeTokenReq, logoutReq, renewTokenReq } from "@/utils/backend/authAPI";

const RIVMAdfsProvider = {
  id: "rivm-adfs",
  name: "RIVM ADFS",
  type: "oauth",
  wellKnown: process.env.OAUTH2_RIVM_ADFS_WELL_KNOWN_URL,
  clientId: process.env.OAUTH2_RIVM_ADFS_CLIENT_ID,
  clientSecret: process.env.OAUTH2_RIVM_ADFS_CLIENT_SECRET,
  authorization: { params: { scope: "openid email profile" } },
  idToken: true,
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
    }
  },

} as Provider

interface CredentialsUser {
  id: string;
  email: string;
  account: {
    accessToken: string;
    expiresAt: Date;
    refreshToken: string;
  };
}

const dummyUserEmail = process.env.DUMMY_USER_EMAIL || '';

const initToken = async (email: string) => {
  const researcherBackendURL = process.env.RESEARCHER_BACKEND_URL ? process.env.RESEARCHER_BACKEND_URL : '';
  console.log('dummy login at url ' + researcherBackendURL);
  const response = await fetch(`${researcherBackendURL}/v1/auth/init-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': process.env.RESEARCHER_BACKEND_API_KEY || '',
    },
    body: JSON.stringify({ email: email }),
  });
  if (!response.ok) {
    console.error(`error while getting access token: ${response.status} ${response.statusText}`);
    throw new Error('LoginFailed');
  }

  const data = await response.json();
  return data;
}


const CASECredentialProvider = CredentialsProvider({
  id: "dummy-login",
  credentials: {
  },
  async authorize(credentials, req) {
    if (!credentials) {
      return null;
    }

    try {
      const data = await initToken(dummyUserEmail);

      // console.log(data);
      const now = new Date();
      return {
        id: 'dummy-user',
        email: dummyUserEmail,
        account: {
          accessToken: data.accessToken,
          expiresAt: new Date(now.getTime() + data.expiresIn * 60000),
          refreshToken: data.refreshToken,
        }
      };
    } catch (error: any) {
      console.error('error while dummy login: ' + error.message);
      throw error;
    }
  },
})



const providers: Provider[] = [
  CASECredentialProvider,
  RIVMAdfsProvider,
];

export const authOptions = {
  providers: providers,
  pages: {
    signIn: '/',
  },
  events: {
    signOut: async ({ token }) => {
      if (token.access_token && token.refresh_token) {
        try {
          logoutReq(token.access_token, token.refresh_token);
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        if (account.provider === 'dummy-login') {
          if (!user) {
            return {
              ...token,
              error: 'LoginFailed' as const,
            };
          }
          const currentUser = user as CredentialsUser;
          return {
            email: currentUser.email,
            access_token: currentUser.account.accessToken,
            expires_at: currentUser.account.expiresAt.getTime(),
            refresh_token: currentUser.account.refreshToken,
          };
        }

        if (account.provider === 'rivm-adfs') {
          console.log('jwt callback')
          console.log(user);
          console.log(token);
          console.log(account);
          if (!user || !user.email) {
            console.error('user or user.email is undefined');
            return { ...token, error: 'LoginFailed' as const };
          }
          const data = await initToken(user.email);
          return {
            email: user.email,
            access_token: data.accessToken,
            expires_at: new Date().getTime() + data.expiresIn * 1000,
            refresh_token: data.refreshToken,
          }
        }
        return {
          // email: account.email,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        }

      } else if (token.expires_at !== undefined && token.expires_at > 0 && Date.now() < token.expires_at) {
        // If the access token has not expired yet, return it
        return token
      } else {
        // If the access token has expired, try to refresh it
        if (!token.refresh_token || !token.access_token) {
          return {
            ...token,
            error: 'RefreshAccessTokenError' as const,
          }
        }
        try {
          const response = await renewTokenReq(token.refresh_token, token.access_token);
          return {
            ...token,
            access_token: response.data.accessToken,
            expires_at: new Date().getTime() + response.data.expiresIn * 1000,
            refresh_token: response.data.refreshToken,
          }
        } catch (error) {
          console.error(error);
          return {
            ...token,
            error: 'RefreshAccessTokenError' as const,
          }
        }
      }
    },
    session({ session, token }) {
      session.accessToken = token.access_token;
      session.error = token.error
      return session
    },
  },
  logger: {
    debug: (...args) => console.log(...args),
    error: (...args) => console.error(...args),
    warn: (...args) => console.warn(...args),
  }
} as AuthOptions;

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

declare module "next-auth/" {
  interface Session {
    accessToken?: string
    error?: "RefreshAccessTokenError" | "LoginFailed"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string
    expires_at?: number
    refresh_token?: string
    error?: "RefreshAccessTokenError" | "LoginFailed"
  }
}


