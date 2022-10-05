import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { gameHistory, Prisma } from '@prisma/client';

@Injectable()
export class GameHistoryService {
  constructor(private prisma: PrismaService) {}

  async gameHistory(
    gameHistoryWhereUniqueInput: Prisma.gameHistoryWhereUniqueInput,
  ): Promise<gameHistory | null> {
    return this.prisma.gameHistory.findUnique({
      where: gameHistoryWhereUniqueInput,
    });
  }

  async gameHistorys(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.gameHistoryWhereUniqueInput;
    where?: Prisma.gameHistoryWhereInput;
    orderBy?: Prisma.gameHistoryOrderByWithRelationInput;
  }): Promise<gameHistory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.gameHistory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createGameHistory(data: Prisma.gameHistoryCreateInput): Promise<gameHistory> {
    return this.prisma.gameHistory.create({
      data,
    });
  }

  async updateGameHistory(params: {
    where: Prisma.gameHistoryWhereUniqueInput;
    data: Prisma.gameHistoryUpdateInput;
  }): Promise<gameHistory> {
    const { where, data } = params;
    return this.prisma.gameHistory.update({
      data,
      where,
    });
  }

  async deleteGameHistory(where: Prisma.gameHistoryWhereUniqueInput): Promise<gameHistory> {
    return this.prisma.gameHistory.delete({
      where,
    });
  }
}