"use strict";


// ----------------------------- variables -----------------------------
const search_header = $('#word-search');
const search_wrapper = $('#outputsearch');
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
let audio = false;

// ----------------------------- functions -----------------------------
async function getData(value){
    let response = await fetch(url+value);
    let data = await response.json();
    renderData(data[0]);
}

function renderData(data){
    console.log(data);
    search_wrapper.innerHTML = `
        <h3 class="font-bold text-[35px] mb-[15px]">${data.word}</h3>
        <p class="text-[#8C8B8B] mb-[15px]">${data.meanings[0].synonyms}, ${data.meanings[0].partOfSpeech}</p>
        <div class="flex gap-4 items-start">
            <audio src="${data.phonetics[0].audio}" id="audio-word" controls class="mb-[0px] w-[0px] h-0 overflow-hidden"></audio>
            <i class='bx bx-volume-full text-[25px] cursor-pointer' id="audio"></i>
            <p class="text-[20px] font-semibold mb-[15px]">${data.phonetics[1].text}</p>
        </div>
        <p>${data.meanings[0].definitions[0].definition}</p>
    `
}


// ----------------------------- add events -----------------------------
search_header.addEventListener('keyup', (e) => {
    e.preventDefault();
    if(e.keyCode === 13){
        let value = search_header.value;
        getData(value);
    }
});

search_wrapper.addEventListener('click', (e) => {
    if(e.target.id === 'audio'){
        if(e.target.previousSibling.previousElementSibling.id === "audio-word"){
            e.target.previousSibling.previousElementSibling.play()
        }
    }
});