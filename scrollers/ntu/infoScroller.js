const fs = require("fs");
const puppeteer = require("puppeteer");

async function getInformation() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.ntu.ac.uk/");

  const information = await page.evaluate(() => {
    const addressElement = document.querySelector(".global-footer__address");
    const anchors = document.querySelectorAll(".gtm-footer");
    const spans = addressElement.querySelectorAll("span");
    const times = document.querySelector(".reception-times").textContent;
    const header = document.querySelector(
      ".hero-banner-homepage__heading h2"
    ).innerText;
    const subHeader = document.querySelector(
      ".hero-banner-homepage__text div p"
    ).innerText;
    const logo = document.querySelector(".m-header__grid a").innerHTML;

    const details = {};
    const contactDetails = {};
    const openedDuring = {};
    const seoData = {};

    anchors.forEach((a) => {
      const contact = a.getAttribute("itemprop");
      const textContent = a.innerText.trim();
      if (contact) {
        contactDetails[contact] = textContent;
      }
    });
    spans.forEach((span) => {
      const itemprop = span.getAttribute("itemprop");
      const textContent = span.innerText.trim();

      if (itemprop) {
        details[itemprop] = textContent;
      }
    });

    openedDuring.times = times;
    seoData.heading = header;
    seoData.subHeading = subHeader;
    seoData.logo = logo;

    return {
      details,
      contactDetails,
      openedDuring,
      seoData,
    };
  });

  fs.writeFile("information.json", JSON.stringify(information), (err) => {
    if (err) throw err;
    console.log("INFORMATION_FILE_SAVED");
  });
  await browser.close();
}

module.exports = getInformation;
