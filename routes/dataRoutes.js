import { Router } from 'express';
import  getData  from '../controllers/dataController.js';
import  getUsers  from '../controllers/loginInformation.js';
import getRoles from '../controllers/getRoles.js'
import getSites from '../controllers/getSites.js';

const router = Router();

router.get('/data', (req,res)=>{
    getData().then(dbRes => {
      res.send(dbRes)
    }).catch(err =>{
      res.send(err)
    })
  });

  router.get('/users', (req,res)=>{
    getUsers().then(dbRes => {
      res.send(dbRes)
    }).catch(err =>{
      res.send(err)
    })
  });

  router.get('/roles',(req,res)=>{
    getRoles().then(dbRes => {
         res.send(dbRes)
    }).catch(err =>{
      res.send(err)
    })
  });

  router.get('/sites',(req,res)=>{
    getSites().then(dbRes => {
         res.send(dbRes)
    }).catch(err =>{
      res.send(err)
    })
  });

export default router;
