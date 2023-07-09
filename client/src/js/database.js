import { openDB } from 'idb';

const initializeDatabase = async () =>
  openDB('text-editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text-content')) {
        console.log('text-content database already exists');
        return;
      }
      db.createObjectStore('text-content', { keyPath: 'id', autoIncrement: true });
      console.log('text-content database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const saveContentToDatabase = async (content) => {
  const db = await openDB('text-editor', 1);
  const tx = db.transaction('text-content', 'readwrite');
  const store = tx.objectStore('text-content');
  await store.put({ id: 1, value: content });
  console.log('Content was saved to the database');
};

// TODO: Add logic for a method that gets all the content from the database
export const getContentFromDatabase = async () => {
  const db = await openDB('text-editor', 1);
  const tx = db.transaction('text-content', 'readonly');
  const store = tx.objectStore('text-content');
  const request = store.getAll(1);
  const data = await request;
  console.log('Reading content from the database...');
  return data?.value;
};

initializeDatabase();
