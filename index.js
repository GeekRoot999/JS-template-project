const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
let counter = 0;

//show Loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide Loading 
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote(){
    loading();
    //Pick a random Quote from API quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //To check if author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;
    }
    //check quote length to determine the styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch (apiURL);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        if (counter < 7){
            getQuote();
            counter = counter + 1;
        }
        else{
            alert("Something is wrong with this page. Please try again later.")
        }
    }
}

//Tweet a quote
function tweetQuote (){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on Loading
getQuotes();