const { Router } = require("express");
const { createContact, listContacts } = require("../controllers/contactController.cjs");

const router = Router();

router.get("/", listContacts);
router.post("/", createContact);

module.exports = router;
