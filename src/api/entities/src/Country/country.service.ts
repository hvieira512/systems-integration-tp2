import { Injectable, ConflictException, NotFoundException   } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CountryService {
  private prisma = new PrismaClient();

  async create(data: { name: string }): Promise<any> {
    return this.prisma.country.create({
      data: {
        name: data.name,
      },
    });
  }
  

  async getById(id: string): Promise<any | null> {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }

    return country;
  }

  async findAll(): Promise<any[]> {
    return this.prisma.country.findMany();
  }

  async update(id: string, data: { name: string }): Promise<any> {
    const updatedCountry = await this.prisma.country.update({
      where: { id },
      data,
    });

    if (!updatedCountry) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }

    return updatedCountry;
  }

  async delete(id: string): Promise<void> {
    const deletedCountry = await this.prisma.country.delete({
      where: { id },
    });

    if (!deletedCountry) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
  }
}
