import { EntityRepository } from '@mikro-orm/mariadb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ImageService } from 'src/commons/image/image.service';
import { Restaurant } from 'src/entities/Restaurant';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: EntityRepository<Restaurant>,
    private readonly imageService: ImageService,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepo.findAll();
  }

  async findOne(id: number): Promise<Restaurant> {
    const event = await this.restaurantRepo.findOne(id);
    if (!event) {
      throw new NotFoundException({
        status: 404,
        error: 'Restaurant not found',
      });
    }
    return event;
  }

  async create(createDto: CreateRestaurantDto): Promise<Restaurant> {
    const imageUrl = await this.imageService.saveImage(
      'restaurants',
      createDto.image,
    );
    const restaurant = Restaurant.fromCreateDto(createDto);
    restaurant.image = imageUrl;

    await this.restaurantRepo.insert(restaurant);
    return restaurant;
  }

  async remove(id: number): Promise<void> {
    await this.restaurantRepo.nativeDelete(id);
  }
}
