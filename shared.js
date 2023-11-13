var saveSettings = async () => {
  console.log("save settings");
  // load redirect url from local storage
  const ytUrlStore = await chrome.storage.local.get(["yt_url"]);
  const redirYtHomeStore = await chrome.storage.local.get(["redir_yt_home"]);

  var urlGroups = ytUrlStore.yt_url.match(/(\S+):\/\/([^:]+):?(\d*)/)

  console.log(urlGroups);


  const yt_vid_rule = {
    "id": 1,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "transform": {
          "host": urlGroups[2],
          "scheme": urlGroups[1]
        }
      }
    },
    "condition": {
      "regexFilter": "^https://.*\\.youtube\\.com/.+",
      "excludedInitiatorDomains": [urlGroups[2]],
      "resourceTypes": ["main_frame"]
    }
  }
  
  const yt_home_rule = {
    "id": 2,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "transform": {
          "host": urlGroups[2],
          "scheme": urlGroups[1]
        }
      }
    },
    "condition": {
      "regexFilter": "^https://.*\\.youtube\\.com/?$",
      "resourceTypes": ["main_frame"]
    }
  }

  if (urlGroups[2] != "") {
    yt_vid_rule.action.redirect.transform["port"] = urlGroups[3]
    yt_home_rule.action.redirect.transform["port"] = urlGroups[3]
  }

  // Get arrays containing new and old rules
  const newRules = [yt_vid_rule]
  if (redirYtHomeStore.redir_yt_home) {
    newRules.push(yt_home_rule);
  }

  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  const oldRuleIds = oldRules.map(rule => rule.id);

  console.log({oldRuleIds});
  console.log({newRules});

  // Use the arrays to update the dynamic rules
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    addRules: newRules
  });
}

export default saveSettings;
