import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Restaurant } from 'src/entities/Restaurant';

@Injectable()
export class RestaurantListInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    return next.handle().pipe(
      map((restaurants: Restaurant[]) => {
        return {
          restaurants: restaurants.map((r) => {
            r.image = r.image && baseUrl + r.image;
            return r;
          }),
        };
      }),
    );
  }
}
