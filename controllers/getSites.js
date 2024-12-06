import ord from "oracledb";
import connectDB from "../config/db.js";

async function getSites(req, res) {
  try {
    const conn = await connectDB();

    let result = await conn.execute(
      `select site_id, site_name from sites`,
      [],
      { resultSet: true, outFormat: ord.OUT_FORMAT_OBJECT }
    );

    const rs = result.resultSet;
    const rows = await rs.getRows();
    await rs.close();
    await conn.close();
    return rows;
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
}

export default getSites;
