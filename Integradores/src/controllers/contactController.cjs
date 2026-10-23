const { Contact } = require("../models/contactModel.cjs");

const FIELDS = ["name", "email", "phone", "subject", "comments"];

async function createContact(req, res) {
  const data = {};
  for (const field of FIELDS) {
    if (req.body?.[field] !== undefined) {
      data[field] = req.body[field];
    }
  }
  const contact = await Contact.create(data);
  res.status(201).json(contact);
}

async function listContacts(req, res) {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
}

module.exports = { createContact, listContacts };
