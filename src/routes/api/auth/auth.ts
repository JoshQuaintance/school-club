import { SvelteKitAuth } from 'sk-auth';
import { GoogleOAuth2Provider } from 'sk-auth/providers';
import dotenv from 'dotenv';
import { userJWT } from '$shared/utils/stores';

dotenv.config();

export const oauth = new SvelteKitAuth({
    providers: [
        new GoogleOAuth2Provider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            profile(profile) {
                return { ...profile, provider: 'google' };
            }
        })
    ],
    callbacks: {
        jwt(token, profile) {
            if (profile?.provider) {
                const { provider, ...account } = profile;
                token = {
                    ...token,
                    user: {
                        ...(token.user ?? {}),
                        connections: { ...(token.user?.connections ?? {}), [provider]: account }
                    }
                };
            }

            userJWT.set(token);

            return token;
        },
        redirect(url) {
            return '/check-in';
        }
    },
    jwtSecret: process.env.JWT_SECRET_KEY
});
