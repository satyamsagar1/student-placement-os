const router = require('express').Router();
const upload = require('../../config/multer');
const resumeController = require('./resume.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/',authMiddleware,upload.single('resume'),resumeController.addResume);
router.get('/', authMiddleware, resumeController.getResumes);
router.get('/:id', authMiddleware, resumeController.getResumeById);
router.delete('/:id', authMiddleware, resumeController.deleteResume);

module.exports = router;