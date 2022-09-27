const { nanoid } = require('nanoid')
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    console.log(data);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(5),
        name,
        email,
        phone
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const id = contacts.findIndex(item => item.id === contactId);

    if (id === -1) {
        return null;
    }
    const [result] = contacts.splice(id, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result
}

const updateContact = async (id, { name, email, phone }) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
}
