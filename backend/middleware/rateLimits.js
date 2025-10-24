import rateLimit from "express-rate-limit";

export const aiLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50,
    message: {
        error: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,   
});

export const readLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200,
    message: {
        error: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,   
});

export const createLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 20,
    message: {
        error: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,   
});

export const updateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 60,
    message: {
        error: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,   
});

export const deleteLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 30,
    message: {
        error: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,   
});