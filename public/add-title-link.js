function exec() {
  var btn = document.createElement("BUTTON");
  btn.style = [
    "font-size: 10px",
    "opacity: 0.5",
    "position: fixed",
    "right: 0",
    "top: 0",
    "background-color: blue",
    "width: 40px",
    "height: 20px",
    "color: white",
    "z-index: 9999"
  ].join(";");

  btn.innerHTML = "ADD";
  btn.onclick = () => {
    const divNode = document.createElement("DIV");
    divNode.className = "requestly-title-link";
    divNode.style =
      "position:fixed; z-index:9999; top:0; left: 0; background-color:yellow; padding: 20px";

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

    if (window.location.hash.trim()) {
      const hashText = getHashText();
      const hashTextNode = document.createTextNode(`${hashText} - `);
      aNode.appendChild(hashTextNode);
    }

    const title = document.querySelector("title").innerText;
    const titleNode = document.createTextNode(title);
    aNode.appendChild(titleNode);
    divNode.appendChild(aNode);

    divNode.appendChild(document.createElement("BR"));

    const urlNode = document.createTextNode(`- ${getHost()}`);
    divNode.appendChild(urlNode);

    document.body.appendChild(divNode);
  };
  document.body.appendChild(btn);
}

function getHashText() {
  const hashElement = document.querySelector(window.location.hash);

  let text = hashElement.innerText;

  if (text) {
    text = text.trim();
  }

  if (!text) {
    text = hashElement.parentNode.innerText;
  }

  return text.trim().substr(0, 100);
}

function getHost() {
  const host = window.location.host;
  return host.replace(/^www\./, "");
}

if (window.self === window.top) {
  exec();
}
