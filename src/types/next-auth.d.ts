import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    jwt?: string;
    role?: string;
    profile?: any;
    strapiUser?: any;
  }

  interface User extends DefaultUser {
    jwt?: string;
    role?: string;
    profile?: any;
    strapiUser?: any;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt?: string;
    role?: string;
    profile?: any;
    strapiUser?: any;
  }
}