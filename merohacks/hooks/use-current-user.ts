import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();
    return session.data?.user;
}
// This hooks basically provides us the way we can access sthe user's information 



