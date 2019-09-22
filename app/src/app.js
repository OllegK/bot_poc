require('dotenv').config();
const puppeteer = require('puppeteer');
const timeout = require('./timeout');
const childProcess = require('child_process');

(async () => {

  let child = childProcess.spawn('./windlogin.sh', [process.env.WINDSCRIBE_LOGIN, process.env.WINDSCRIBE_PASSWORD]);
  child.on('exit', code => {
    console.log(`Exit code is: ${code}`);
  });
  child.on('error', error => {
    console.log(`Error: ${error}`);
  });
  for await (const data of child.stdout) {
    console.log(`stdout from windscribe login: ${data}`);
  };

  child = childProcess.exec('windscribe connect DE');
  child.on('exit', code => {
    console.log(`Exit code is: ${code}`);
  });
  child.on('error', error => {
    console.log(`Error: ${error}`);
  });
  for await (const data of child.stdout) {
    console.log(`stdout from the windscribe connect: ${data}`);
  };
  console.log('finished')
  // console.log(childProcess.spawnSync('windscribe', ['connect']).toString());

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
  // process.exit();
})();
