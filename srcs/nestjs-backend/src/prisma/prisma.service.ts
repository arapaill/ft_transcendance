import { Injectable 
// , OnModuleInit, INestApplication
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
	constructor() {
		super({
			datasources: {
				db: {
					url: 'postgresql://jandre:jandrepass@postgres:5432/transcendance?schema=public'
				},
			},
		});
	}
	
	// async onModuleInit() {
	// 	await this.$connect();
	//   }
	
	//   async enableShutdownHooks(app: INestApplication) {
	// 	this.$on('beforeExit', async () => {
	// 	  await app.close();
	// 	});    
	//   }
}