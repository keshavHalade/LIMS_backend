import ord from "oracledb";
import connectToDB from "../config/db.js";

async function getUsers(req, res) {
  try {
    const connection = await connectToDB();

    let result = await connection.execute(
      `select user_id, name, email, password, role, site from users`,
      [],
      { resultSet: true, outFormat: ord.OUT_FORMAT_OBJECT }
    );
    const rs = result.resultSet;
    const rows = await rs.getRows();
    // Close the result set and the connection
    await rs.close();
    await connection.close();
    return rows;
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
}



export default getUsers;
