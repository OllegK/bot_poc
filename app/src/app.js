require('dotenv').config();
const puppeteer = require('puppeteer');
const timeout = require('./timeout');

(async () => {

  console.log(process.env.CHROMIUM_PATH);
  console.log(process.env.ID);
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
  //  { executablePath: process.env.CHROMIUM_PATH}
  );


  console.log('got browser');
  const page = await browser.newPage();
  console.log('got new page');
  await page.setDefaultNavigationTimeout(0);
  const url = 'https://whatismyipaddress.com/';
  // let url = 'https://instagram.com/ana.na.letonia';
  let response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 1800000 });
  console.log('got site');
  await page.screenshot({ path: `./output/screen2_${process.env.ID}.png` });
  console.log('finished');
  await browser.close();
  process.exit();
})();

async function onMessage(message) {
  message = message || 'Message is not defined';
  logger.info(`${message} received`);
  await telegramBot.sendMessage(message);
  process.exit(0);
}

process.on('SIGINT', onMessage); // on ctrl+c
process.on('SIGTERM', onMessage); // on kill pid
process.on('SIGBREAK', onMessage); // ?
