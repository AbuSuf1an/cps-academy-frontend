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
            // Fetch user profile from Strapi /me endpoint
            const profileResponse = await fetcher.get('/api/user-profiles/me', {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            });

            const { user: userData, profile } = profileResponse.data;

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
        } catch (error) {
          console.error('Authentication error:', error);
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