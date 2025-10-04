import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetcher } from '@/lib/fetcher';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Call Strapi login endpoint
          const response = await fetcher.post('/api/auth/local', {
            identifier: credentials.email,
            password: credentials.password,
          });

          const { jwt, user } = response.data;

          if (jwt && user) {
            // Try to fetch user profile from Strapi /me endpoint
            let userData = user;
            let profile = null;
            
            try {
              const profileResponse = await fetcher.get('/api/user-profiles/me', {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              });
              
              const profileData = profileResponse.data;
              userData = profileData.user || user;
              profile = profileData.profile;
            } catch (profileError: any) {
              console.log('Profile not found, creating one:', profileError?.response?.status);
              
              // If profile doesn't exist, create one as fallback
              try {
                const createProfileResponse = await fetcher.post('/api/user-profiles', {
                  data: {
                    role: 'NormalUser',
                    displayName: user.username || user.email.split('@')[0],
                    user: user.id,
                  }
                }, {
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
                });
                
                console.log('Profile created successfully');
                profile = {
                  id: createProfileResponse.data.data.id,
                  role: 'NormalUser',
                  displayName: user.username || user.email.split('@')[0],
                };
              } catch (createError: any) {
                console.error('Failed to create profile:', createError?.response?.data);
                // Still allow authentication even if profile creation fails
              }
            }

            return {
              id: user.id.toString(),
              email: user.email,
              name: user.username,
              jwt: jwt,
              role: profile?.role || 'NormalUser',
              profile: profile,
              strapiUser: userData,
            };
          }

          return null;
        } catch (error: any) {
          console.error('Authentication error:', error);
          console.error('Error response data:', error?.response?.data);
          console.error('Error status:', error?.response?.status);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Persist the JWT token and user data in the token
      if (user) {
        token.jwt = user.jwt;
        token.role = user.role;
        token.profile = user.profile;
        token.strapiUser = user.strapiUser;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to the client
      session.jwt = token.jwt as string;
      session.role = token.role as string;
      session.profile = token.profile;
      session.strapiUser = token.strapiUser;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };