const path = require("node:path");
const fs = require("node:fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.log(contacts);
  } catch (error) {
    console.error("Error reading contacts file:", error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);
  } catch (error) {
    console.error("Error reading contacts file:", error);
  }
}

async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    contacts = contacts.fiter((c) => c.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact removed succesfully.");
  } catch (error) {
    console.error("Error writing contacts file:", error);
  }
}

async function addContact(name, email, phone) {
  const id = nanoid();
  try {
    let contact = await listContacts();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added successfully.");
  } catch (error) {
    console.error("Error writing contacts file:", error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
