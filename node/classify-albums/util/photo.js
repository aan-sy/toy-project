const path = require('path');
const process = require('process');
const fs = require('fs');

// 1. node에 인자로 전달 받은 test 폴더 경로를 알아낸다.
// 2. test 폴더의 파일 목록을 읽는다. 
// 3. 파일들의 확장자 별로 필요한 폴더를 만든다. 해당하는 폴더로 파일을 옮긴다. (이미 폴더가 존재한다면 파일을 옮겨주기만 한다.)

// 사용자에게 제대로 input 받았는지 확인하지 않았다. 이 부분 다시 확인 
const testPath = path.resolve(`../pictures/${process.argv[2]}`);
console.info(`🙌 testPath is ${testPath}`);

const moveFile = (filePath, mediatype) => {
  const fileName = path.basename(filePath);
  const newPath = testPath + path.sep + mediatype + path.sep + fileName; 
  fs.promises.rename(filePath, newPath)
  .catch(console.error)
}

const makeDir = (filePath, mediatype) => {
  const dirPath  = testPath + path.sep + mediatype;
  
  if(fs.existsSync(dirPath)) {
    console.info(`🙌 '${dirPath}' already exists!! The file will be transferred.`)
    moveFile(filePath, mediatype)
  } else {
    try{
      fs.mkdirSync(dirPath);
      console.info(`🙌 '${dirPath}' is created!! The file will be transferred.`)
      moveFile(filePath, mediatype)
    } catch (error) {
      console.log(error)
    }
  }
}

const classify = (filePathList) => {
  filePathList.forEach((filePath) => {
    const fileExtension = path.extname(filePath);

    switch (fileExtension) {
      case '.mov':
      case '.mp4':
        makeDir(filePath, 'videos');
        break;
      case '.aae':
      case '.png':
        makeDir(filePath, 'captured');
        break;
      case '.jpg':
        // 원본 파일이 삭제되고 없다면? 오류가 날 수 있다. 이 부분 다시 확인
        if(path.basename(filePath, '.jpg').includes('E')) {
          const originFileName = path.basename(filePath).replace('E', '');
          const originFilePath = testPath + path.sep + originFileName;

          makeDir(originFilePath, 'duplicated');
        }
    }
  })
}

const readFileList = (testPath) => {
  const filePathList = [];

  fs.promises.readdir(testPath)
  .then((files) => {
    files.forEach((file) => filePathList.push(testPath + path.sep + file))
    console.info(`🙌 file list in testPath :`);
    
    classify(filePathList);
  })
  .catch(console.error);
}

readFileList(testPath);






