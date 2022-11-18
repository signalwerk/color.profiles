import * as cheerio from "cheerio";
import fs from "fs";

const HTML = fs.readFileSync("./data/index.html", "utf8");
const $ = cheerio.load(HTML);
const desktopItems = $("div").find(".is-hidden-tablet").remove();
const items = $(".column.is-three-quarters .columns")
  //   .remove(".is-hidden-tablet")
  //   .find('.is-hidden-tablet').remove()
  .toArray();

let itemsHTML = items.map((item) => $.html(item)).join("\n");

fs.writeFileSync("./docs/index.html", htmlWrap("Color Profiles", itemsHTML));

function htmlWrap(title, content) {
  return `
        <!DOCTYPE html>
        <html lang="en" class="template--document">
          <head>
            <meta charset="utf-8" />
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="${title}" />
    
            <!-- fonts -->
            <link rel="preconnect" href="https://fonts.signalwerk.ch" />
            <link
              href="https://fonts.signalwerk.ch/css/latest/family=Open+Sans:ital,wght@0,300..800;1,300..800.css"
              rel="stylesheet"
            />
            <!-- styles -->
            <link
              rel="stylesheet"
              href="https://rawcdn.githack.com/signalwerk/signalwerk.styles/72d62b5/styles/doc.critical.css"
              media="all"
            />
            <link
              rel="preload"
              as="style"
              onload="this.onload=null;this.rel='stylesheet'"
              href="https://rawcdn.githack.com/signalwerk/signalwerk.styles/72d62b5/styles/doc.rest.css"
              media="all"
            />
            <link rel="stylesheet" href="colors.css">
            <link rel="stylesheet" href="styles.css">
          </head>
          <body class="body">
            <main>
              <!-- html:children:start -->
    
              <article class="document">
                <header class="header">
                  <div class="header__inner">
                    <h1 class="header__title">${title}</h1>
                    <p class="header__subline">
                      Extracted from <a href="https://colorshift.theretherenow.com/profiles" target="_blank" rel="noreferrer">[color/shift]</a>
                    </p>
                    <p class="header__info">Stefan Huber · November 17, 2022</p>
                  </div>
                </header>
    
                <!-- document:children:start -->
    
                <div class="document__item">
                  <section class="collection">
                    <!-- collection:children:start -->
                    <h2>Collection</h2>
    
    
                    ${content}
                    <div class="markdown"></div>
    
                    <!-- collection:children:end -->
                  </section>
                </div>
    
                <!-- document:children:end -->
              </article>
    
              <!-- html:children:end -->
            </main>
          </body>
        </html>
      `;
}
