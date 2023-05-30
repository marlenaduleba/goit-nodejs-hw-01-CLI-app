const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact) {
        throw new Error(`Contact by id=${id} not found`);
      }
      console.table(contact);
      break;

    case "add":
      const updatedList = await contacts.addContact(name, email, phone);
      console.table(updatedList);
      break;

    case "remove":
      const remainingContacts = await contacts.removeContact(id);
      console.table(remainingContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
