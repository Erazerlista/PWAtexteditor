import { openDB } from 'idb';

const initdb = async () => {
  const jateDB = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create a connection to the database
  const jateDB = await openDB('jate', 1);
  // Open a transaction to specify the database and access mode
  const tx = jateDB.transaction('jate', 'readwrite');
  // Open up the object store
  const store = tx.objectStore('jate');
  // Use the put() method on the store to add content
  const request = store.put({ content }); // Changed {jate: content} to { content }
  // Wait for the request to complete
  const result = await request;
  // Confirmation of data added to the database
  console.log('Data saved to database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from database');
  // Create a connection to the database
  const jateDB = await openDB('jate', 1);
  // Open object store
  const tx = jateDB.transaction('jate', 'readonly');
  // Access the object store
  const store = tx.objectStore('jate');
  // Use the getAll() method to get data from the database
  const request = store.getAll();
  // Wait for the request to complete
  const result = await request;
  console.log('Result', result);
  return result;
}

initdb();
