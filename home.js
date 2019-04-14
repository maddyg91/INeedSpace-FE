const apodUrl= 'http://localhost:3000/api/v1/apod?api_key=jdCci90zMTb076TOrfTGriiH1nCEcLqJGNUXhRHP'
const postFavUrl= 'http://localhost:3000/api/v1/favorites'

function imageOfTheDay() {
  fetch(apodUrl)
  .then(response => response.json())
  .then(data => renderImage(data));
}

function renderImage(data) {
  let url = data["data"]["attributes"].url
  let imageTitle = data["data"]["attributes"].title
  image = document.createElement('img');
  image.src = url;
  image.className = 'image';
  document.getElementById("day-image").appendChild(image);

  title = document.createElement('p');
  title.innerHTML = imageTitle;
  title.className = 'image-title';
  document.getElementById("day-image").appendChild(title);

  const starHTML = `<i class="fas fa-star" id= "fav"></i>`;
  starBtn = document.createElement('button');
  starBtn.innerHTML = starHTML;
  starBtn.setAttribute('class', 'star-favorite');
  starBtn.addEventListener('click',function() {
     addToFavorites(data)});
  document.getElementById("day-image").appendChild(starBtn);
}

function addToFavorites(data) {
  const title = data["data"]["attributes"].title
  const url = data["data"]["attributes"].url
  const hdurl = data["data"]["attributes"].hdurl
  const explanation = data["data"]["attributes"].explanation
  postFavorite(title, url, hdurl, explanation)
}

function postFavorite(title, url, hdurl, explanation) {
  const data = {
    title: title,
    url: url,
    hdurl: hdurl,
    explanation: explanation
  }
  fetch(postFavUrl, {
    method: 'post',
    headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data),
  });
}

imageOfTheDay()
