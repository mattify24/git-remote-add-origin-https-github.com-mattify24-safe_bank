import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      res.status(401).json({ msg: 'No token, auth denied!' });
      return; // prevent further execution
    }

    const token = authHeader.split(' ')[1];
    const supabaseSecret = process.env.SUPABASE_JWT_SECRET;

    if (!supabaseSecret) {
      res.status(500).json({ msg: 'Server configuration error.' });
      return;
    }

    const decoded = jwt.verify(token, supabaseSecret) as JwtPayload;

    // Attach decoded payload to request object if needed
    (req as any).user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token, auth denied!' });
    return; // optional, but explicit
  }
};