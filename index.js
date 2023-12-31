let card = document.querySelector(".card");
let date = document.querySelector(".date");
let id = document.querySelector(".id");
let longURL = document.querySelector(".longURL");
let thumbnailImage = document.querySelector(".thumbnailImage");
let title = document.querySelector(".title");
let cards_container = document.getElementById("cards-container");
let templateNewsCard = document.getElementById("template-news-card");
let SearchBtn = document.getElementById("SearchBtn");
let formControl = document.querySelector(".form-control");
SearchBtn.addEventListener("click", async () => {
  cards_container.innerHTML = "";
  const apiKey = "b7c304f15fea4e27b49a5450fa467349";
  const urlNewsApi = `https://newsapi.org/v2/everything?q=${formControl.value}&`;
  try {
    const response = await fetch(`${urlNewsApi}apiKey=${apiKey}`);
    const result = await response.json();
    // console.log(result);
    Ui(result);
    formControl.value = "";
  } catch (error) {
    console.error(error);
  }
});

function Ui(data) {
  let dataresponse = data.articles;
  dataresponse.forEach((element) => {
    if (!element.urlToImage) return;
    let {
      author,
      content,
      description,
      publishedAt,
      source,
      title,
      urlToImage,
      url,
    } = element;
    let div = document.createElement("div");
    div.setAttribute("class", "grid");
    const newsUi = `
        <a id="amain" href="${url} target="_blank"">
         <div class="card">
        <div class="card-header">
            <img src="${urlToImage}" alt="news-image" id="news-img">
        </div>
        <div class="card-content">
            <h3 id="news-title">${title}</h3>
            <h6 class="news-source" id="news-source">${new Date(
              publishedAt
            ).toLocaleString()}</h6>
            <p class="news-desc" id="news-desc">
            ${description}
           </p>
        </div>
      </div>
      </a>`;
    div.innerHTML = newsUi;
    cards_container.appendChild(div);
  });
}
