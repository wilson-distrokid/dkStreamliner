function main() {
  if (window.location.href.indexOf("this+is+just+so+that+wilsons+extension+will+work+lol") > -1) {
    alert("nice refresh dude! close this page now :)");
    window.close();
    }
  let oohSelecta = loadSettings();

  // find the search type
  let searchType = document.querySelector(".searchContent");
  searchType = searchType.outerHTML;

  // if the search type is email, open all unique links in new tabs.
  if (searchType.indexOf("Email") != -1) {
    // get user id
    let userId = document.querySelector("#js-customer-info-link").attributes.href.value.split("=")[1];
    console.log(userId);
    searchByEmail(userId, oohSelecta);

  // if search type is song artist etc., simply do not clickthrough
  } else if (searchType.indexOf("Song Artist") != -1) {
    console.log("Song / Artist, do not clickthrough.");

  // if the search type is UPC, just open the only available link.
  } else if (searchType.indexOf("UPC") != -1) {
    window.open(document.querySelector(".searchContent a"), "_self");

  // if the search type is ISRC, run conditional ISRC link opening code
  } else if (searchType.indexOf("ISRC")) {
    searchbyISRC();
  };
};

function loadSettings() {
  // load the users choices from options.js via chrome sync
  //*
  chrome.storage.sync.get([ 'userPageDesired', 'ccPageDesired', 'aPageDesired' ], function(data) {
    localStorage.setItem('aPageDesired', Object.values(data)[0]);
    localStorage.setItem('ccPageDesired', Object.values(data)[1]);
    localStorage.setItem('userPageDesired', Object.values(data)[2]);
  }); //*/

  let oohSelecta = [JSON.parse(localStorage.getItem('userPageDesired')), JSON.parse(localStorage.getItem('ccPageDesired')), JSON.parse(localStorage.getItem('aPageDesired'))];
  return oohSelecta;
}

function searchByEmail(userId, oohSelecta) {
    // create array of urls for specific desired pages.
    var selfOrNah = "_blank";
    let pageURLs = ["https://distrokid.com/madmin/customers/info/?customerid=", "https://distrokid.com/madmin/customers/info/cclog/?userID=", "https://distrokid.com/madmin/albums/?userid="];
    var truecount = 0;

    for (var i = 0; i < oohSelecta.length; i++) {
      if (oohSelecta[i]) {
        truecount++;
      }
    }

    // double check to make sure there aren't two user accounts associated with that email.
    allEmailLinks = document.querySelectorAll("#js-customer-info-link");
    var duplicateUserIdCounter = 0;
    for (var i = 0; i < allEmailLinks.length; i++) {
      if (userId = allEmailLinks[i].attributes.href.value.split("=")[1]) {
        duplicateUserIdCounter++;
      }
    }

    // if two different accounts, do blank
    console.log(truecount, allEmailLinks.length, duplicateUserIdCounter);
    if (truecount > 1 || allEmailLinks.length != duplicateUserIdCounter) {
      selfOrNah = "_blank"
    } else {
      selfOrNah = "_self"
    }

    // open desired links from all checked boxes
    for (var i = 0; i < oohSelecta.length; i++) {
      if (oohSelecta[i]) {
        userPageURL = pageURLs[i] + userId;
        window.open(userPageURL, selfOrNah);
        // console.log('normally we\'d open this url with: ' + selfOrNah + " " + userPageURL);
        // console.log('normally a window would open here');
      } else {
        console.log('nvm they all off');
      }
    }
};

// opens all album pages that contain searched ISRC in new tabs, except opens last link in extension search tab.
function searchbyISRC() {
  // get array of all urls inside .searchContent
  var searchContentLinks = document.querySelectorAll(".searchContent a");

  // skips all user page urls
  for (let i = 0; i < searchContentLinks.length -2; i = i+2) {
    // as long as its not the last album link, open in new tab
    if (i != searchContentLinks.length - 3) {
      console.log("i open in new tab");
      window.open(searchContentLinks[i],"_blank")
    // for last album link open in same tab.
    } else {
      console.log("this is the last isrc link ");
      window.open(searchContentLinks[i],"_self")
    }
  };
};

main();
