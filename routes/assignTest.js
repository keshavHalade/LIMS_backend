import { Router } from "express";
const router = Router();
import connectToDB from '../config/db.js';

// Assign Test Endpoint
router.post("/assign-test", async (req, res) => {
  try {
    console.log("body",req.body);
    const connection = await connectToDB();
    const { patientId, testName, assignmentDate, priority } =  req.body;
    if (!patientId || !testName || !assignmentDate || !priority) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const result = await connection.execute(
      "INSERT INTO test_assignments (patient_id, test_name, assignment_date, priority) VALUES (:1, :2, TO_DATE(:3, 'YYYY-MM-DD'), :4)",
      [patientId, testName, assignmentDate, priority]
    );
    console.log(result);
    
    res.status(201).json({ assignmentId: result.lastRowid });
    connection.commit();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to assign test." });
  }
});

export default router;
