import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const info = {
      query: req.query,
      params: req.params,
      body: req.body,
    };
    this.logger.info(
      `${req.method} ${req.originalUrl} ${JSON.stringify(info)}`,
    );
    next();
  }
}
