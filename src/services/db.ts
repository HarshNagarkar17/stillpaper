export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  fontFamily?: string;
  fontSize?: number;
}

export class NotesDB {
  private static instance: NotesDB;
  private db: IDBDatabase | null = null;

  private constructor() {}

  public static getInstance(): NotesDB {
    if (!NotesDB.instance) {
      NotesDB.instance = new NotesDB();
    }
    return NotesDB.instance;
  }

  public async init(): Promise<void> {
    if (this.db) return;

    this.db = await new Promise((resolve, reject) => {
      const request = indexedDB.open("NotesDB", 2);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains("notes")) {
          const store = db.createObjectStore("notes", { keyPath: "id" });
          store.createIndex("updatedAt", "updatedAt", { unique: false });
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  public getDB(): IDBDatabase {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.");
    }
    return this.db;
  }

  public createNote({
    fontFamily,
    fontSize,
    title,
  }: {
    fontFamily: string;
    fontSize: number;
    title: string;
  }): Note {
    return {
      id: crypto.randomUUID(),
      title,
      content: "",
      fontFamily,
      fontSize,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  public async saveNote(note: Note): Promise<void> {
    const db = this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["notes"], "readwrite");
      const store = transaction.objectStore("notes");
      const request = store.put(note);

      request.onsuccess = () => resolve();
      request.onerror = () => reject();
    });
  }

  public async getNote(id: string): Promise<Note | null> {
    const db = this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("notes", "readonly");
      const store = transaction.objectStore("notes");
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public async getNotes(): Promise<Note[]> {
    const db = this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("notes", "readonly");
      const store = transaction.objectStore("notes");
      const index = store.index("updatedAt");

      const request = index.openCursor(null, "prev");
      const notes: Note[] = [];

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          notes.push(cursor.value as Note);
          cursor.continue();
        } else {
          resolve(notes);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  public async deleteNote(id: string): Promise<void> {
    const db = this.getDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["notes"], "readonly");
      const store = transaction.objectStore("notes");
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject();
    });
  }

  public async getMostRecentNote(): Promise<Note | null> {
    const notes = await this.getNotes();
    return notes.length > 0 ? notes[0] : null;
  }
}
