function exec() {
  var addLinkBtn = document.createElement("BUTTON");
  addLinkBtn.style = [
    "font-size: 10px",
    "opacity: 0.5",
    "position: fixed",
    "right: 0",
    "top: 0",
    "background-color: blue",
    "width: 40px",
    "height: 20px",
    "color: white",
    "z-index: 99999"
  ].join(";");

  addLinkBtn.innerHTML = "ADD";
  addLinkBtn.onclick = () => {
    const divNode = document.createElement("DIV");
    divNode.className = "requestly-title-link";
    divNode.style =
      "position:fixed; z-index:99999; top:0; left: 0; background-color:yellow; padding: 20px";

    const closeBtn = document.createElement("BUTTON");
    closeBtn.innerText = "Close";
    closeBtn.onclick = () => {
      divNode.remove();
    };
    divNode.appendChild(closeBtn);

    divNode.appendChild(document.createElement("BR"));

    const aNode = document.createElement("A");
    aNode.style = "color:red; font-size:16px";
    aNode.href = window.location.href;

    const hashText = getHashText();
    let debugText = "";
    if (hashText) {
      debugText += `${hashText} - `;
      const hashTextNode = document.createTextNode(`${hashText} - `);
      aNode.appendChild(hashTextNode);
    }

    const host = getHost();
    let title = document.querySelector("title").innerText;

    // if (host.endsWith("wikipedia.org")) {
    //   title = title.replace(/ - Wikipedia$/, "");
    // }

    if (host.endsWith("youtube.com")) {
      title = title.replace(/ - YouTube$/, "");
    }

    debugText += title;
    const titleNode = document.createTextNode(title);
    aNode.appendChild(titleNode);
    divNode.appendChild(aNode);

    debugText += ` - `;
    const dashNode = document.createTextNode(` - `);
    divNode.appendChild(dashNode);

    divNode.appendChild(document.createElement("BR"));

    debugText += `${host}`;
    const urlNode = document.createTextNode(`${host}`);
    divNode.appendChild(urlNode);

    document.body.appendChild(divNode);

    console.log(debugText, window.location.href);
    var blob = new Blob([`${debugText}\n\n${window.location.href}`], {
      type: "text/plain"
    });
    setClipboard(blob);
  };
  document.body.appendChild(addLinkBtn);
}

function getHashText() {
  try {
    const hashElement = document.querySelector(window.location.hash);

    let text = hashElement.innerText;

    if (text) {
      text = text.trim();
    }

    if (!text) {
      text = hashElement.parentNode.innerText;
    }

    return text.trim().substr(0, 100);
  } catch (ex) {
    console.warn(`Failed to get text from hash: ${window.location.hash}`);
    return undefined;
  }
}

function getHost() {
  const host = window.location.host;
  return host.replace(/^www\./, "");
}

if (window.self === window.top && window.location.hostname !== "localhost") {
  console.log("Add Title Link loaded.");
  exec();
} else {
  console.log("Add Title Link skipped.");
}

function setClipboard(blob) {
  let data = [new ClipboardItem({ [blob.type]: blob })];

  navigator.clipboard.write(data).then(
    function () {
      console.log("Write title link to clipboard successfully.");
    },
    function (ex) {
      console.log("Failed to write title link to clipboard.", ex);
    }
  );
}
