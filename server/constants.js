module.exports = {
    MONGOURI: "",
    JWT_SECRET: "nooneshoutouchhere@#&*1",
    JWT_TTL: 3600, // 1h
    AUTH_TOKEN: "authorization",
    AUTH_TOKEN_PREFIX: "Bearer ",
    AUTH_EXCEPT: [
        '/login'
    ]
}