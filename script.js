/* global MutationObserver */

function updateStrategy() {
  if (
    document
      .querySelector(".head-ref")
      .textContent.match(/master|main|release|develop|trunk/g)
  ) {
    // If merging from develop (likely to trunk), do a merge commit
    console.log("Clicking merge");
    document
      .querySelector(".merge-message details button[value=merge]")
      .click();
  } else {
    // Otherwise squash by default
    console.log("Clicking squash");
    document
      .querySelector(".merge-message details button[value=squash]")
      .click();
  }
}

function main() {
  const details = document.querySelector(".merge-message details");

  if (details) {
    updateStrategy();
    // Still watch for updates, needed especially for race conditions in single-page navigation
  }

  const actions = document.querySelector(".discussion-timeline-actions");

  if (!actions) {
    // Likely navigation fired before updating DOM but it typically fires again after
    return;
  }

  const observer = new MutationObserver(() => {
    if (document.querySelector(".merge-message details")) {
      observer.disconnect();
      console.log("Merge message updated, running");
      updateStrategy();
    } else {
      console.log("Merge message updated, not ready");
    }
  });

  observer.observe(actions, { subtree: true, childList: true });
}

main();
