import dotenv from "dotenv";
dotenv.config();

const { SERVER_NAME, DATABASE_NAME } = process.env;

const metadata = {
  server: SERVER_NAME,
  database: DATABASE_NAME,
};

export { metadata };
