let redirYtHome = document.querySelector("#redir-yt-home");
let ytUrl = document.querySelector("#yt-redirect-url");

// load redirect url from local storage
const ytUrlStore = await chrome.storage.local.get(["yt_url"]);
const redirYtHomeStore = await chrome.storage.local.get(["redir_yt_home"]);

console.log(ytUrlStore, redirYtHomeStore)

import saveSettings from "./shared.js";

if (ytUrlStore.yt_url !== undefined)
  ytUrl.value = ytUrlStore.yt_url;
if (redirYtHomeStore.redir_yt_home !== undefined)
  redirYtHome.checked= redirYtHomeStore.redir_yt_home;


redirYtHome.addEventListener("change", (event) => {
  chrome.storage.local.set({ redir_yt_home: redirYtHome.checked });
  console.log("changed redirYtHome", redirYtHome.checked, event.target.checked)
  saveSettings();
});

ytUrl.addEventListener("change", (event) => {
  chrome.storage.local.set({ yt_url: ytUrl.value });
  saveSettings();
});
