// Copyright 2022 Google LLC
//
const wrapAsyncFunction = (listener) => (request, sender, sendResponse) => {
  // the listener(...) might return a non-promise result (not an async function), so we wrap it with Promise.resolve()
  Promise.resolve(listener(request, sender)).then(sendResponse);
  return true; // return true to indicate you want to send a response asynchronously
};
chrome.runtime.onMessage.addListener(
  wrapAsyncFunction(async (request, sender) => {
  var glossary = await fetchGlossary(request);
  return glossary[0];
}));
async function fetchGlossary(request) {
  console.log(request.glossaryurl);
  const response = await fetch(request.glossaryurl);
  const glossary = await response.json();
  return glossary;
}
