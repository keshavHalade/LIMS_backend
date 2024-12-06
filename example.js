import  ord from "oracledb";
async function runApp() {
  let connection;
  try {
    connection = await ord.getConnection({
      user: "LIMS",
      password: "keshav",
      connectionString: "localhost/xe",
    });
    console.log("Successfully connected to Oracle Database"); // Create a table
    await connection.execute(
      `begin execute immediate 'drop table todoitem'; exception when others then if sqlcode <> -942 then raise; end if; end;`
    );
    await connection.execute(
      `create table todoitem ( id number generated always as identity, description varchar2(4000), creation_ts timestamp with time zone default current_timestamp, done number(1,0), primary key (id))`
    ); // Insert some data
    const sql = `insert into todoitem (description, done) values(:1, :2)`;
    const rows = [
      ["Task 1", 0],
      ["Task 2", 0],
      ["Task 3", 1],
      ["Task 4", 0],
      ["Task 5", 1],
    ];
    let result = await connection.executeMany(sql, rows);
    console.log(result.rowsAffected, "Rows Inserted");
    connection.commit(); // Now query the rows back
    let result = await connection.execute(
      `SELECT AGE,PATIENT_ID,PATIENT_NAME,GENDER FROM patients`,
      [],
      { resultSet: true, outFormat: ord.OUT_FORMAT_OBJECT }
    );
    const rs = result.resultSet;
    let row;
    while ((row = await rs.getRow())) {
      // if (row.DONE) console.log(row.DESCRIPTION, "is done");
      // else console.log(row.DESCRIPTION, "is NOT done");
      console.log(row);
    }
    await rs.close();
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
runApp();
