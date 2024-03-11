import { openDB } from 'idb';

const initdb = async () =>
  openDB('bete', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('bete')) {
        console.log('bete database already exists');
        return;
      }
      db.createObjectStore('bete', { keyPath: 'id', autoIncrement: true });
      console.log('bete database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const beteDB = await openDB("bete", 1);
  const tx = beteDB.transaction("bete", "readwrite");
  const store = tx.objectStore("bete");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data saved", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const beteDB = await openDB('bete', 1);
  const tx = beteDB.transaction('bete', 'readonly');
  const store = tx.objectStore('bete');
  const request = store.getAll();
  const result = await request;
  console.log('Data read', result);
  return result.value;
};

initdb();
