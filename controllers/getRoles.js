import ord from "oracledb";
import connectToDB from "../config/db.js";

async function getRoles(req, res) {
  try {
    const conn = await connectToDB();
    let result = await conn.execute(
      `SELECT role_id, role_name, description FROM roles`,
      [],
      { resultSet: true, outFormat: ord.OUT_FORMAT_OBJECT }
    );
    const rs = result.resultSet;
    const rows = await rs.getRows();
    // Close the result set and the connection
    await rs.close();
    await conn.close();
    return rows;
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
}

export default getRoles;
