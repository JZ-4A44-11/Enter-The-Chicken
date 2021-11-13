export const config = (): typeof config => ({
  PORT: Number(process.env.PORT),

  AUTH: {
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: '90d',
    },
  },

  DATABASE: {
    port: 5432,
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity.js'],
  },
});
