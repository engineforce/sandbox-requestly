if (window.top === window) {
  console.log("zendesk-default-private.js: Run from " + window.location.href);
  const PRIVATE_NOTE = () => $(".workspace:visible .private_note");

  function changeToPrivateNote(count) {
    count = count || 0;
    console.log("zendesk-default-private.js: Try " + count);

    if (count > 5) {
      return;
    }

    if (PRIVATE_NOTE().length === 1) {
      PRIVATE_NOTE().click();
      console.log("zendesk-default-private.js: Done");
    } else {
      setTimeout(() => {
        changeToPrivateNote(count + 1);
      }, 2000);
    }
  }

  changeToPrivateNote();
}
