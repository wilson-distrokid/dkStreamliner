// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set({
    userPageDesired: document.getElementById("userpgcb").checked,
    ccPageDesired: document.getElementById("ccrefcb").checked,
    aPageDesired: document.getElementById("albumscb").checked


  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Saved! Please refresh the search page';
    setTimeout(function() {
      status.textContent = '';
    }, 3000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    userPageDesired: true,
    ccPageDesired: false,
    aPageDesired: false

  }, function(items) {
    document.getElementById('userpgcb').checked = items.userPageDesired;
    document.getElementById('ccrefcb').checked = items.ccPageDesired;
    document.getElementById('albumscb').checked = items.aPageDesired;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
