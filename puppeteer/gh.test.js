let page;

beforeEach(async () => {
  page = await browser.newPage();
  //await page.goto("https://github.com/team",  {waitUntil: 'load', timeout: 10000});
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team", {
      waitUntil: "load",
      timeout: 10000,
    });
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.setDefaultTimeout(60000);
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  });

  test("The first link attribute", async () => {
    await page.setDefaultNavigationTimeout(60000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.setDefaultTimeout(60000);
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  });
});

beforeEach(async () => {
  await page.goto("https://github.com", { waitUntil: "load", timeout: 10000 });
});

test("Open page contact", async () => {
  const pricing = "li:nth-child(6) summary";
  const contactSale = "li:nth-child(6) li:nth-child(3) a";
  await page.hover(pricing);
  await page.setDefaultTimeout(100000);
  await page.waitForSelector(contactSale);
  await page.click(contactSale);

  let curUrl = await page.url();
  await expect(curUrl).toEqual("https://github.com/enterprise/contact");
});

test("Open page marketplace", async () => {
  const marketplace = "nav > ul > li:nth-child(5) a";
  await page.click(marketplace);
  await page.setDefaultTimeout(60000);
  const title = await page.title();
  expect(title).toEqual(
    "GitHub Marketplace · to improve your workflow · GitHub"
  );
});

test("Open page enterprise", async () => {
  const enterprise = "nav > ul > li:nth-child(3) a";
  await page.click(enterprise);
  await page.setDefaultTimeout(60000);
  const title = await page.title();
  expect(title).toEqual("Enterprise · A smarter way to work together · GitHub");
});
