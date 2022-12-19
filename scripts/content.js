// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

  fetchGlossary(request).then(v => sendResponse({searchResults: v[0]}));
  return true;
//  console.log(glossary);

/*
  const patientpage = document.querySelector(".main");

// `document.querySelector` may return null if the selector doesn't match anything.
if (patientpage) {
  const text = patientpage.textContent;  
  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);
  // // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  // const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // // Use the same styling as the publish information in an article's header
  // badge.classList.add("color-secondary-text", "type--caption");
  // badge.textContent = `⏱️ ${readingTime} min of blissful reading time`;

  badge.textContent = `${wordCount} words found on page`;
  console.log(wordCount);

  // Support for API reference docs
  const heading = patientpage.querySelector("h3");
  // Support for article docs with date
  // const date = article.querySelector("time")?.parentNode;

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
  heading.insertAdjacentElement("beforebegin", badge);
}
*/

});

async function fetchGlossary(request) {
  console.log(request.glossaryurl);
  const response = await fetch(request.glossaryurl);
  const glossary = await response.json();
  return glossary;
}
