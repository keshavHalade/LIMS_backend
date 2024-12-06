import  db  from 'oracledb';

const dbConfig = {
  user: "LIMS",
  password: "keshav",
  connectionString: "localhost/xe",
};

async function connectToDB() {
  try {
     const connection = await db.getConnection(dbConfig);   
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export default connectToDB;
