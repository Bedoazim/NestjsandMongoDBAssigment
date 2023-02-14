import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user/user.repository';

@Injectable()
export class JwtVerifierMiddleware implements NestMiddleware {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: Function) {
    try {
      const token = req.headers['authorization'].split(' ')[1];

      const id: string = this.jwtService.verify(token, {
        secret: process.env.JwtSecretKey,
        ignoreExpiration: false,
      })['id'];

      const user = await this.userRepository.findOne({ _id: id });

      if (user == null) {
        res.status(HttpStatus.UNAUTHORIZED).send('UnAuthorized');
        return;
      }

      req.body.id = id;
      next();

    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send('UnAuthorized');
      return;
    }
  }
}
