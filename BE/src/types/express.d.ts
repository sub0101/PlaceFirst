import { User } from "../interfaces";

declare global {
    namespace Express {
      interface Request {
        user?: User | undefined; // Add 'user' property to the Request interface
      }
    }
  }