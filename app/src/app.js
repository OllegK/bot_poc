require('dotenv').config();
const puppeteer = require('puppeteer');
// const chromium = require('chrome-aws-lambda');
const timeout = require('./timeout');
const childProcess = require('child_process');
const locations = ['US-C', 'US', 'US-W', 'CA', 'CA-W', 'FR', 'DE', 'NL', 'NO', 'CH', 'GB', 'HK'].sort(() => Math.random() - 0.5);

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


  // console.log(process.env.CHROMIUM_PATH);
  // console.log(process.env.ID);
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: '/tmp',
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--proxy-server='direct://'", '--proxy-bypass-list=*',
    // '--no-first-run',
    // '--no-zygote',
    // '--single-process',
    // '--disable-gpu',
    // '--disable-dev-shm-usage',
    ]
  }
  //  { executablePath: process.env.CHROMIUM_PATH}
  );
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
  // const url = 'https://whatismyipaddress.com/';
  const url = 'https://httpbin.org/ip';


  for (var i = 0; i < locations.length; i++) {

    child = childProcess.exec(`windscribe connect ${locations[i]}`);
    child.on('exit', code => {
      console.log(`Exit code is: ${code}`);
    });
    child.on('error', error => {
      console.log(`Error: ${error}`);
    });
    for await (const data of child.stdout) {
      if (data.length > 2) {
        console.log(`stdout from from the windscribe connect to ${locations[i]}: ${data}`);
      }
    };
    console.log(`finished connected to ${locations[i]}`)


    console.time('Connection using ' + locations[i]);
    let response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 1800000 });
    await page.screenshot({ path: `./output/screen2_${process.env.ID}_${locations[i]}.png` });
    console.timeEnd('Connection using ' + locations[i]);

  }

  console.log('finished');
  await browser.close();
  // process.exit();
})();
