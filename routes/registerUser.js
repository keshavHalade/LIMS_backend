import { Router } from "express";
const router = Router();
import connectToDB from '../config/db.js';

router.post("/register-user", async (req, res) => {
  try {
    const connection = await connectToDB();
    console.log(req.body);
    
        const { USER_ID,NAME,EMAIL,PASSWORD,ROLE,SITE,CREATED_AT } = req.body;
        console.log( USER_ID,NAME,EMAIL,PASSWORD,ROLE,SITE,CREATED_AT);
        
    // if (!patientName || !age || !gender || !sampleType || !collectionDate || !testRequested) {
    //   return res.status(400).json({ error: "All fields are required." });
    // }
    //TO_DATE(:7, 'YYYY-MM-DD')
    const result = await connection.execute(
      "INSERT INTO users (USER_ID,NAME,EMAIL,PASSWORD,ROLE,SITE,CREATED_AT) VALUES (:1, :2, :3, :4,:5,:6,:7)",
      [USER_ID,NAME,EMAIL,PASSWORD,ROLE,SITE,CREATED_AT]
    );
    
    res.status(201).json({ status: "user resgistration succesful." });
    connection.commit();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register sample." });
  }
});

export default router;
