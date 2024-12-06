import { Router } from "express";
const router = Router();
import connectToDB from '../config/db.js';

// Register Sample Endpoint
router.post("/register-sample", async (req, res) => {
  try {
    const connection = await connectToDB();
    const { patientName, age, gender, sampleType, collectionDate, testRequested,sampleId } = req.body;
    if (!patientName || !age || !gender || !sampleType || !collectionDate || !testRequested) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const result = await connection.execute(
      "INSERT INTO sample (patient_name, age, gender, sample_type, collection_date, test_requested,SAMPLE_ID) VALUES (:1, :2, :3, :4,  TO_DATE(:5, 'YYYY-MM-DD'), :6,:7)",
      [patientName, age, gender, sampleType, collectionDate, testRequested,sampleId]
    );
    
    res.status(201).json({ status: "register sample." });
    connection.commit();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register sample." });
  }
});

export default router;
