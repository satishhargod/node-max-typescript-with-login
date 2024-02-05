// tokenBlacklist.js

// Initialize Set for token blacklist
const tokenBlacklist = new Set();


export const getTokenBlacklist = () => tokenBlacklist;
export const addToBlacklist = (token:string) => tokenBlacklist.add(token);