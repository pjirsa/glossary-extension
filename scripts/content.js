// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const patientpage = document.querySelector(".main");

// `document.querySelector` may return null if the selector doesn't match anything.
if (patientpage) {
  const text = patientpage.textContent;
  /**
   * Regular expression to find all "words" in a string.
   *
   * Here, a "word" is a sequence of one or more non-whitespace characters in a row. We don't use the
   * regular expression character class "\w" to match against "word characters" because it only
   * matches against the Latin alphabet. Instead, we match against any sequence of characters that
   * *are not* a whitespace characters. See the below link for more information.
   * 
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
   */
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

  sendResponse({ fromcontent: "This message is from content.js" });
});
