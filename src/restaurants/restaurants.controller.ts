import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Restaurant } from 'src/entities/Restaurant';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantListInterceptor } from './interceptors/restaurant-list.interceptor';
import { RestaurantSingleInterceptor } from './interceptors/restaurant-single.interceptor';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @UseInterceptors(RestaurantListInterceptor)
  findAll(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(RestaurantSingleInterceptor)
  findOne(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(RestaurantSingleInterceptor)
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.restaurantsService.remove(+id);
  }
}
