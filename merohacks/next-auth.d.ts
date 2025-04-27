// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserRole } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, {type DefaultSession} from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole;
}

declare module "next-auth"{
    interface Session{
        user: ExtendedUser;
    }
}

