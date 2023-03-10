import { getDatabase, ref, set, update } from 'firebase/database';

const writeToDatabase = (table: string, data: any, id?: string | number) => {
  const db = getDatabase();

  if (id) {
    const reference = ref(db, table + `/${id}`);

    set(reference, data);
  }
};

const updateToDatabse = (table: string, data: any, id?: string | number) => {
  const db = getDatabase();

  if (id) {
    const reference = ref(db, table + `/${id}`);

    update(reference, data);
  }
};

export { writeToDatabase, updateToDatabse };
