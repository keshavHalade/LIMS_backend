import { getConnection } from "../db/connection";
import { executeQuery } from "../db/utils";
import { selectPatients } from "../db/queries";

async function fetchPatients() {
  let connection;
  try {
    connection = await getConnection();
    const result = await executeQuery(connection, selectPatients, [], {
      resultSet: true,
      outFormat: require("oracledb").OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet;
    let row;
    const patients = [];
    while ((row = await rs.getRow())) {
      patients.push(row);
    }
    await rs.close();
    return patients;
  } catch (err) {
    console.error("Error fetching patients:", err);
    return [];
  } finally {
    if (connection) await connection.close();
  }
}

export default { fetchPatients };
