const fs = require('fs');

// 指定要遍历的文件夹路径
const directoryPath = './your_directory';

// 使用同步读取目录
fs.readdirSync(directoryPath).forEach((file) => {
  const filePath = path.join(directoryPath, file);

  // 判断是否为文件夹，如果是则递归遍历，如果不是则检查扩展名
  if (fs.lstatSync(filePath).isDirectory()) {
    getMdFilesInDirectory(filePath);
  } else if (path.extname(filePath) === '.md') {
    console.log(filePath); // 输出.md文件路径
  }
});

function getMdFilesInDirectory(dir) {
  fs.readdirSync(dir).forEach((innerFile) => {
    const innerFilePath = path.join(dir, innerFile);

    if (fs.lstatSync(innerFilePath).isDirectory()) {
      getMdFilesInDirectory(innerFilePath);
    } else if (path.extname(innerFilePath) === '.md') {
      // 第一个参数是源文件路径
      const srcPath = './src/file.txt';
      // 第二个参数是目标文件路径
      const destPath = './dest/copy_of_file.txt';

      // 使用 fs.copyFile() 方法复制文件
      fs.copyFile(srcPath, destPath, (err) => {
        if (err) {
          console.error('复制文件时出错:', err);
        } else {
          console.log('文件复制成功');
        }
      });
    }
  });
}
