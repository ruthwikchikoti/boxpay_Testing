import { Request, Response } from 'express';

// Extend Express Request and Response types if needed
declare global {
  namespace Express {
    interface Request {}
    interface Response {}
  }
} 