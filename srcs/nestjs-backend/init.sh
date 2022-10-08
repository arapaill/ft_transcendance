sleep 15
npx prisma generate
npx prisma db push --accept-data-loss
npm run start:dev