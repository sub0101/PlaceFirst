import bcrypt from "bcrypt"

const SALT_ROUND =10;
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    return await bcrypt.hash(password, salt);
  };

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
  };