import { Client } from "pg";

import postgres from 'postgres'
import { drizzle} from 'drizzle-orm/postgres-js'
import * as schema from './schema' 
const sql = postgres("postgresql://postgres:152535@localhost:5432/postgres")

export const db = drizzle(sql,{schema})