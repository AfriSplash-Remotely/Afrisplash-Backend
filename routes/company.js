const express = require('express');
const router = express.Router();
const { R_protect } = require('../middleware/auth');
const protect = R_protect; //Ony Recuiter can create Jobs Now
const advancedResults = require('../middleware/advancedResults');
const {
  create,
  getCompanies,
  getVCompanies, // Would be filter by the front end developer (Not Required)
  deleteCompany,
  verifyCompany,
  editCompany
} = require('../controllers/company');
const Company = require('../model/companies');
const meta = {
  name: 1,
  logo: 1,
  thumbnail: 1,
  location: 1,
  market: 1,
  one_Line_Pitch: 1,
  verified: 1,
  staff: 1,
  _id: 1
};

router.get('/', advancedResults(Company, 'created_by', meta), getCompanies);
router.post('/', protect, create);
router.put('/verify', verifyCompany);
router.put('/:company', protect, editCompany);
router.delete('/:company', protect, deleteCompany);

module.exports = router;
