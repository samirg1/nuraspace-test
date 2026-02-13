import bcrypt from "bcryptjs";

/**
 * Hash a string.
 * @param string string to hash.
 * @returns The hashed string.
 */
export const hashString = async (string: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(string, salt);
};

/**
 * Compare a string and a hashed string to see if they match.
 * @param attemptedString The attempted string.
 * @param actualString The actual hashed string to compare against.
 * @returns Whether the strings match.
 */
export const compareStringToHash = async (
    attemptedString: string,
    actualString: string,
) => {
    return await bcrypt.compare(attemptedString, actualString);
};
