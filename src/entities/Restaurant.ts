import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CreateRestaurantDto } from 'src/restaurants/dto/create-restaurant.dto';
import { StringArrayType } from '../types/StringArrayType';

@Entity()
export class Restaurant {
  @PrimaryKey({ autoincrement: true, columnType: 'int', unsigned: true })
  id: number;

  @Property({ length: 150, nullable: false })
  name: string;

  @Property({ length: 2000, nullable: false })
  description: string;

  @Property({ type: StringArrayType, length: 20, nullable: false })
  daysOpen: string[];

  @Property({ length: 20, nullable: false })
  phone: string;

  @Property({ length: 100, nullable: false })
  image: string;

  @Property({ length: 250, nullable: false })
  cuisine: string;

  constructor(
    id: number,
    name: string,
    description: string,
    daysOpen: string[],
    phone: string,
    image: string,
    cuisine: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.daysOpen = daysOpen;
    this.phone = phone;
    this.image = image;
    this.cuisine = cuisine;
  }

  static fromCreateDto(createDto: CreateRestaurantDto) {
    return new Restaurant(
      undefined,
      createDto.name,
      createDto.description,
      createDto.daysOpen,
      createDto.phone,
      createDto.image,
      createDto.cuisine,
    );
  }
}
