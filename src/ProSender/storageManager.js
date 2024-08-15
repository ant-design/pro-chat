import { v4 as uuidv4 } from 'uuid';

class LocalStorageManager {
  constructor(defaultExpiryTime = 60 * 60 * 1000) {
    this.defaultExpiryTime = defaultExpiryTime; // 默认过期时间为 1 小时
  }

  // 存储数据方法，返回生成的唯一 key
  storeFile(file) {
    const key = uuidv4();
    const expiry = new Date(new Date().getTime() + this.defaultExpiryTime);
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: file.size,
          base64,
          expiry,
        };
        localStorage.setItem(key, JSON.stringify(fileInfo));
        resolve(key);
      };
      reader.onerror = (error) => {
        reject('文件读取失败');
      };
    });
  }

  // 按照 keys 数组，返回批量取出存储的 files
  getFiles(keys) {
    return keys
      .map((key) => {
        const item = localStorage.getItem(key);
        if (item) {
          const fileInfo = JSON.parse(item);
          if (new Date(fileInfo.expiry) > new Date()) {
            return { ...fileInfo, uid: key };
          } else {
            localStorage.removeItem(key);
            return null;
          }
        }
        return null;
      })
      .filter((file) => file !== null);
  }

  // 设置过期时间
  setExpiryTime(milliseconds) {
    this.defaultExpiryTime = milliseconds;
  }

  // 按照指定的 keys 从存储里面删除数据
  removeFiles(keys) {
    return keys.map((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        localStorage.removeItem(key);
        return { key, success: true };
      } else {
        return { key, success: false, error: '文件不存在' };
      }
    });
  }
}

export default LocalStorageManager;
