import 'dotenv/config';

export const VARS = {
    port: process.env.PORT,
    jwtSalt: process.env.JWT_SALT,
    cookieSalt: process.env.COOKIE_SALT,
    adminAccessTokenLiveTimeInSeconds: process.env.ADMIN_ACCESS_TOKEN_LIVE_TIME_IN_SECONDS,
    adminRefreshTokenLiveTimeInSeconds: process.env.ADMIN_REFRESH_TOKEN_LIVE_TIME_IN_SECONDS,
};