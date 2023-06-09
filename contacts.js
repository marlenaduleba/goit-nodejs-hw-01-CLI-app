const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log("Error reading contacts file:", error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactToFind = contacts.find((contact) => contact.id === contactId);
    return contactToFind;
  } catch (error) {
    console.log("Error reading contacts file:", error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToDelete = await getContactById(contactId);
    if (!contactToDelete) {
      console.log(`There's no contact with id: ${contactId} in contact list.`);
    }

    const remainingContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(remainingContacts));
    console.log(
      `Contact with id: ${contactToDelete.id}, name: ${contactToDelete.name}, email: ${contactToDelete.email}, phone: ${contactToDelete.phone} removed successfully.`
    );
    return remainingContacts;
  } catch (error) {
    console.log("Error writing contacts file:", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(
      `Contact with id: ${newContact.id}, name: ${newContact.name}, email: ${newContact.email}, phone: ${newContact.phone} added successfully.`
    );
    return contacts;
  } catch (error) {
    console.log("Error writing contacts file:", error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
