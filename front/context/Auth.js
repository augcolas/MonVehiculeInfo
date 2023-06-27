import { useRouter, useSegments } from "expo-router";
import React, {useContext} from "react";

const Auth = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
    return useContext(Auth);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
    const segments = useSegments();
    const router = useRouter();

    React.useEffect(() => {
        const inAuthGroup = segments[0] === "(login)";

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !user &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            router.replace("/login");
        } else if (user && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace("/");
        }
    }, [user, segments]);
}

export function Provider(props) {
    const [user, setAuth] = React.useState(null);

    useProtectedRoute(user);

    return (
        <Auth.Provider
            value={{
                signIn: () => setAuth({}),
                signOut: () => setAuth(null),
                user,
            }}
        >
            {props.children}
        </Auth.Provider>
    );
}
