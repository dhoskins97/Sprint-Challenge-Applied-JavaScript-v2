// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

const cardsContainer = document.querySelector('.cards-container')

axios.get(`https://lambda-times-backend.herokuapp.com/articles`).then((res) => {
    console.log(res.data);
    res.data.articles.values().forEach( articleGrouping => {
        articleGrouping.forEach( individualArticle => {
            cardsContainer.appendChild(cardCreator(individualArticle))
        })
    })


}).catch((error) => console.log(error));

function cardCreator(obj){
    const card = document.createElement('div');
    const cardHeadline = document.createElement('div');
    const cardAuthorDiv = document.createElement('div');
    const cardImageContainer = document.createElement('div');
    const cardAuthorImage = document.createElement('img');
    const cardAuthorName = document.createElement('span');

    card.append(cardHeadline, cardAuthorDiv);
    cardAuthorDiv.append(cardImageContainer, cardAuthorName);
    cardImageContainer.appendChild(cardAuthorImage);

    card.classList.add('card');
    cardHeadline.classList.add('headline');
    cardAuthorDiv.classList.add('author');
    cardImageContainer.classList.add('img-container');
    
    cardHeadline.textContent = obj.headline;
    cardAuthorImage.src = obj.authorPhoto;
    cardAuthorName.textContent = obj.authorName;
    
    return card;
}

