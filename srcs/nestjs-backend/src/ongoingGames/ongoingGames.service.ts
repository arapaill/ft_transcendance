import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ongoingGame, Prisma } from '@prisma/client';

@Injectable()
export class OngoingGameService {
  constructor(private prisma: PrismaService) {}

  async ongoingGame(
    ongoingGameWhereUniqueInput: Prisma.ongoingGameWhereUniqueInput,
  ): Promise<ongoingGame | null> {
    return this.prisma.ongoingGame.findUnique({
      where: ongoingGameWhereUniqueInput,
    });
  }

  async ongoingGames(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ongoingGameWhereUniqueInput;
    where?: Prisma.ongoingGameWhereInput;
    orderBy?: Prisma.ongoingGameOrderByWithRelationInput;
  }): Promise<ongoingGame[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ongoingGame.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createOngoingGame(data: Prisma.ongoingGameCreateInput): Promise<ongoingGame> {
    return this.prisma.ongoingGame.create({
      data,
    });
  }

  async updateOngoingGame(params: {
    where: Prisma.ongoingGameWhereUniqueInput;
    data: Prisma.ongoingGameUpdateInput;
  }): Promise<ongoingGame> {
    const { where, data } = params;
    return this.prisma.ongoingGame.update({
      data,
      where,
    });
  }

  async deleteOngoingGame(where: Prisma.ongoingGameWhereUniqueInput): Promise<ongoingGame> {
    return this.prisma.ongoingGame.delete({
      where,
    });
  }
}