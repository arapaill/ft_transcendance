sleep 20
npx prisma generate
npx prisma db push --accept-data-loss --skip-generate
npx prisma migrate dev
npm run start:dev