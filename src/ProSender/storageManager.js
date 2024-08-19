import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

class IndexedDBManager {
  constructor(defaultExpiryTime = 60 * 60 * 1000) {
    this.defaultExpiryTime = defaultExpiryTime; // 默认过期时间为 1 小时
    this.dbPromise = openDB('file-store', 1, {
      upgrade(db) {
        db.createObjectStore('files', { keyPath: 'uid' });
      },
    });
  }

  // 存储数据方法，返回生成的唯一 key
  async storeFile(file) {
    const key = uuidv4();
    const expiry = new Date(new Date().getTime() + this.defaultExpiryTime);
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result;
        const fileInfo = {
          uid: key,
          name: file.name,
          type: file.type,
          size: file.size,
          base64,
          expiry,
        };
        try {
          const db = await this.dbPromise;
          await db.put('files', fileInfo);
          resolve(key);
        } catch (e) {
          reject('IndexedDB 存储失败');
        }
      };
      reader.onerror = (error) => {
        reject('文件读取失败');
      };
    });
  }

  // 按照 keys 数组，返回批量取出存储的 files
  async getFiles(keys) {
    const db = await this.dbPromise;
    const files = await Promise.all(
      keys.map(async (key) => {
        const file = await db.get('files', key);
        if (file && new Date(file.expiry) > new Date()) {
          return file;
        } else if (file) {
          await db.delete('files', key);
          return null;
        }
        return null;
      }),
    );
    return files.filter((file) => file !== null);
  }

  // 设置过期时间
  setExpiryTime(milliseconds) {
    this.defaultExpiryTime = milliseconds;
  }

  // 按照指定的 keys 从存储里面删除数据
  async removeFiles(keys) {
    const db = await this.dbPromise;
    const results = await Promise.all(
      keys.map(async (key) => {
        const file = await db.get('files', key);
        if (file) {
          await db.delete('files', key);
          return { key, success: true };
        } else {
          return { key, success: false, error: '文件不存在' };
        }
      }),
    );
    return results;
  }
}

export default IndexedDBManager;
