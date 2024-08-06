// 下载图片脚本

const axios = require("axios");
const fs = require("fs");
const path = require("path");

// 传入图片地址,批量下载图片
const imageUrls = [
  "http://gips3.baidu.com/it/u=119870705,2790914505&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=720",
  "http://gips3.baidu.com/it/u=617385017,3644165978&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
];

const downloadImage = async (url, filePath) => {
  const response = await axios({
    url,
    responseType: "stream",  // 响应的数据将以流的形式逐步接收
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filePath))
      .on("finish", () => resolve())
      .on("error", (e) => reject(e));
  });
};

const downloadImages = async ({ successInfo = true }) => {
  const len = imageUrls.length;
  let successNum = 0;
  for (let i = 0; i < len; i++) {
    const url = imageUrls[i];
    const filepath = path.resolve(__dirname, "images", `image${i + 1}.jpg`);
    try {
      await downloadImage(url, filepath);
      successNum++;
      if (successInfo) {
        console.log(`Downloaded ${url} to ${filepath}`);
      }
    } catch (error) {
      console.error(`Failed to download ${url}:`, error);
    }
  }
  console.log(
    `共${len}张图片,下载成功${successNum}张,下载失败${len - successNum}张`
  );
};

downloadImages({ successInfo: false });
