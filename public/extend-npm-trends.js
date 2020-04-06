fetch("https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.min.js")
  .then(response => response.text())
  .then(text => eval(text));

setTimeout(() => {
  jQuery(".name-header").each((i, element) => {
    const pkg = element.innerText;
    const url = `https://registry.npmjs.com/-/v1/search?text=${pkg}&size=1`;
    const npmLink = `(<a href=https://www.npmjs.com/package/${pkg}>npm</a>)`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const date = new Date(data.objects[0].package.date);
        jQuery(element)
          .closest("td")
          .append(`${npmLink} (${dateFns.format(date, "YYYY-MM-DD")})`);
      });
  });
}, 2000);

function padZero(num) {
  if (num > 10) {
    return num.toString();
  }

  return `0${num}`;
}
