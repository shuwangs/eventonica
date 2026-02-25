# eventonica

## How to start?

### Database Setup
You can initilize the database using either method below

#### Method 1: Restore from dump(recommended)
```bash
# Drop database if it exists
dropdb --if-exists eventonica

# Create a fresh database
createdb eventonica

# Restore database from dump
psql -d eventonica -f server/db/db_dump.sql
```

#### Method 2: Run schema + seed manually
```bash
# Drop database if it exists
dropdb --if-exists eventonica

# Create database
createdb eventonica

# Create schema and tables
psql -d eventonica -f server/db/schema.sql

# Insert seed data
psql -d eventonica -f server/db/seed.sql
```

### Environment Variable
Create a .env file inside the `server` folder:
```bash
DATABASE_URL=postgresql://localhost:5432/eventonica
PORT=3001
```

### Start the App
```bash
# Start backend
cd server
npm install
npm run dev

# Start frontend
cd ../client
npm install
npm run dev
```

### Note
If you encounter database permission or role errors, ensure PostgreSQL is installed and running, and your local user has permission to create databases.