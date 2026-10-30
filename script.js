const API_URL = `https://restcountries.com/v3.1/all`
const search = document.getElementById("search")
const region = document.getElementById("region")
const countriesList = document.getElementById("countriesList")
const countriesCount = document.getElementById("count")
const message = document.getElementById("message")
const modal = document.getElementById("modal");
const modalFlag = document.getElementById("modalFlag");
const modalName = document.getElementById("modalName");
const closeBtn = document.getElementById("closeBtn");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "☀️ Світла тема";
    } else {
        themeToggle.textContent = "🌙 Темна тема";
    }
});

let currentPage = 1;
const itemsPerPage = 8;

let countries = [
    {"name":"United States of America","capital":["Washington, D.C."],"population":331002651,"flags":{"small":"https://flagcdn.com/w320/us.png","png":"https://flagcdn.com/w320/us.png"},"currencies":[{"code":"USD","name":"United States dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC-05:00","UTC-04:00","UTC-06:00","UTC-07:00","UTC-08:00"]},
    {"name":"Canada","capital":["Ottawa"],"population":37742154,"flags":{"small":"https://flagcdn.com/w320/ca.png","png":"https://flagcdn.com/w320/ca.png"},"currencies":[{"code":"CAD","name":"Canadian dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"},{"iso639_1":"fr","iso639_2":"fra","name":"French","nativeName":"français"}],"timezones":["UTC-04:00","UTC-05:00","UTC-06:00","UTC-07:00","UTC-08:00"]},
    {"name":"Mexico","capital":["Mexico City"],"population":128932753,"flags":{"small":"https://flagcdn.com/w320/mx.png","png":"https://flagcdn.com/w320/mx.png"},"currencies":[{"code":"MXN","name":"Mexican peso","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-06:00","UTC-07:00","UTC-08:00"]},
    {"name":"Brazil","capital":["Brasília"],"population":212559417,"flags":{"small":"https://flagcdn.com/w320/br.png","png":"https://flagcdn.com/w320/br.png"},"currencies":[{"code":"BRL","name":"Brazilian real","symbol":"R$"}],"languages":[{"iso639_1":"pt","iso639_2":"por","name":"Portuguese","nativeName":"Português"}],"timezones":["UTC-03:00","UTC-04:00","UTC-05:00"]},
    {"name":"Argentina","capital":["Buenos Aires"],"population":45195774,"flags":{"small":"https://flagcdn.com/w320/ar.png","png":"https://flagcdn.com/w320/ar.png"},"currencies":[{"code":"ARS","name":"Argentine peso","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-03:00"]},
    {"name":"Colombia","capital":["Bogotá"],"population":50882891,"flags":{"small":"https://flagcdn.com/w320/co.png","png":"https://flagcdn.com/w320/co.png"},"currencies":[{"code":"COP","name":"Colombian peso","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-05:00"]},
    {"name":"Chile","capital":["Santiago"],"population":19116201,"flags":{"small":"https://flagcdn.com/w320/cl.png","png":"https://flagcdn.com/w320/cl.png"},"currencies":[{"code":"CLP","name":"Chilean peso","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-04:00","UTC-03:00"]},
    {"name":"Peru","capital":["Lima"],"population":32971854,"flags":{"small":"https://flagcdn.com/w320/pe.png","png":"https://flagcdn.com/w320/pe.png"},"currencies":[{"code":"PEN","name":"Peruvian sol","symbol":"S/."}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-05:00"]},
    {"name":"Venezuela","capital":["Caracas"],"population":28435940,"flags":{"small":"https://flagcdn.com/w320/ve.png","png":"https://flagcdn.com/w320/ve.png"},"currencies":[{"code":"VEF","name":"Venezuelan bolívar","symbol":"Bs"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-04:00"]},
    {"name":"Ecuador","capital":["Quito"],"population":17643054,"flags":{"small":"https://flagcdn.com/w320/ec.png","png":"https://flagcdn.com/w320/ec.png"},"currencies":[{"code":"USD","name":"United States dollar","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-05:00","UTC-06:00"]},
    {"name":"United Kingdom of Great Britain and Northern Ireland","capital":["London"],"population":67886011,"flags":{"small":"https://flagcdn.com/w320/gb.png","png":"https://flagcdn.com/w320/gb.png"},"currencies":[{"code":"GBP","name":"British pound","symbol":"£"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC"]},
    {"name":"France","capital":["Paris"],"population":65273511,"flags":{"small":"https://flagcdn.com/w320/fr.png","png":"https://flagcdn.com/w320/fr.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"fr","iso639_2":"fra","name":"French","nativeName":"français"}],"timezones":["UTC+01:00"]},
    {"name":"Germany","capital":["Berlin"],"population":83783942,"flags":{"small":"https://flagcdn.com/w320/de.png","png":"https://flagcdn.com/w320/de.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"de","iso639_2":"deu","name":"German","nativeName":"Deutsch"}],"timezones":["UTC+01:00"]},
    {"name":"Italy","capital":["Rome"],"population":60461826,"flags":{"small":"https://flagcdn.com/w320/it.png","png":"https://flagcdn.com/w320/it.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"it","iso639_2":"ita","name":"Italian","nativeName":"Italiano"}],"timezones":["UTC+01:00"]},
    {"name":"Spain","capital":["Madrid"],"population":46438422,"flags":{"small":"https://flagcdn.com/w320/es.png","png":"https://flagcdn.com/w320/es.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC","UTC+01:00"]},
    {"name":"Portugal","capital":["Lisbon"],"population":10196709,"flags":{"small":"https://flagcdn.com/w320/pt.png","png":"https://flagcdn.com/w320/pt.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"pt","iso639_2":"por","name":"Portuguese","nativeName":"Português"}],"timezones":["UTC","UTC-01:00"]},
    {"name":"Netherlands","capital":["Amsterdam"],"population":17134872,"flags":{"small":"https://flagcdn.com/w320/nl.png","png":"https://flagcdn.com/w320/nl.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"nl","iso639_2":"nld","name":"Dutch","nativeName":"Nederlands"}],"timezones":["UTC+01:00"]},
    {"name":"Belgium","capital":["Brussels"],"population":11589623,"flags":{"small":"https://flagcdn.com/w320/be.png","png":"https://flagcdn.com/w320/be.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"nl","iso639_2":"nld","name":"Dutch","nativeName":"Nederlands"},{"iso639_1":"fr","iso639_2":"fra","name":"French","nativeName":"français"},{"iso639_1":"de","iso639_2":"deu","name":"German","nativeName":"Deutsch"}],"timezones":["UTC+01:00"]},
    {"name":"Switzerland","capital":["Bern"],"population":8654622,"flags":{"small":"https://flagcdn.com/w320/ch.png","png":"https://flagcdn.com/w320/ch.png"},"currencies":[{"code":"CHF","name":"Swiss franc","symbol":"Fr"}],"languages":[{"iso639_1":"de","iso639_2":"deu","name":"German","nativeName":"Deutsch"},{"iso639_1":"fr","iso639_2":"fra","name":"French","nativeName":"français"},{"iso639_1":"it","iso639_2":"ita","name":"Italian","nativeName":"Italiano"}],"timezones":["UTC+01:00"]},
    {"name":"Austria","capital":["Vienna"],"population":9006398,"flags":{"small":"https://flagcdn.com/w320/at.png","png":"https://flagcdn.com/w320/at.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"de","iso639_2":"deu","name":"German","nativeName":"Deutsch"}],"timezones":["UTC+01:00"]},
    {"name":"Sweden","capital":["Stockholm"],"population":10099265,"flags":{"small":"https://flagcdn.com/w320/se.png","png":"https://flagcdn.com/w320/se.png"},"currencies":[{"code":"SEK","name":"Swedish krona","symbol":"kr"}],"languages":[{"iso639_1":"sv","iso639_2":"swe","name":"Swedish","nativeName":"svenska"}],"timezones":["UTC+01:00"]},
    {"name":"Norway","capital":["Oslo"],"population":5421241,"flags":{"small":"https://flagcdn.com/w320/no.png","png":"https://flagcdn.com/w320/no.png"},"currencies":[{"code":"NOK","name":"Norwegian krone","symbol":"kr"}],"languages":[{"iso639_1":"no","iso639_2":"nor","name":"Norwegian","nativeName":"Norsk"}],"timezones":["UTC+01:00"]},
    {"name":"Denmark","capital":["Copenhagen"],"population":5792202,"flags":{"small":"https://flagcdn.com/w320/dk.png","png":"https://flagcdn.com/w320/dk.png"},"currencies":[{"code":"DKK","name":"Danish krone","symbol":"kr"}],"languages":[{"iso639_1":"da","iso639_2":"dan","name":"Danish","nativeName":"dansk"}],"timezones":["UTC+01:00"]},
    {"name":"Finland","capital":["Helsinki"],"population":5540720,"flags":{"small":"https://flagcdn.com/w320/fi.png","png":"https://flagcdn.com/w320/fi.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"fi","iso639_2":"fin","name":"Finnish","nativeName":"suomi"},{"iso639_1":"sv","iso639_2":"swe","name":"Swedish","nativeName":"svenska"}],"timezones":["UTC+02:00"]},
    {"name":"Poland","capital":["Warsaw"],"population":37846611,"flags":{"small":"https://flagcdn.com/w320/pl.png","png":"https://flagcdn.com/w320/pl.png"},"currencies":[{"code":"PLN","name":"Polish złoty","symbol":"zł"}],"languages":[{"iso639_1":"pl","iso639_2":"pol","name":"Polish","nativeName":"język polski"}],"timezones":["UTC+01:00"]},
    {"name":"Greece","capital":["Athens"],"population":10423054,"flags":{"small":"https://flagcdn.com/w320/gr.png","png":"https://flagcdn.com/w320/gr.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"el","iso639_2":"ell","name":"Greek","nativeName":"Ελληνικά"}],"timezones":["UTC+02:00"]},
    {"name":"Turkey","capital":["Ankara"],"population":84339067,"flags":{"small":"https://flagcdn.com/w320/tr.png","png":"https://flagcdn.com/w320/tr.png"},"currencies":[{"code":"TRY","name":"Turkish lira","symbol":"₺"}],"languages":[{"iso639_1":"tr","iso639_2":"tur","name":"Turkish","nativeName":"Türkçe"}],"timezones":["UTC+03:00"]},
    {"name":"Russia","capital":["Moscow"],"population":145934462,"flags":{"small":"https://flagcdn.com/w320/ru.png","png":"https://flagcdn.com/w320/ru.png"},"currencies":[{"code":"RUB","name":"Russian ruble","symbol":"₽"}],"languages":[{"iso639_1":"ru","iso639_2":"rus","name":"Russian","nativeName":"Русский"}],"timezones":["UTC+02:00","UTC+03:00","UTC+04:00","UTC+06:00","UTC+07:00","UTC+08:00","UTC+09:00","UTC+10:00","UTC+11:00","UTC+12:00"]},
    {"name":"Ukraine","capital":["Kyiv"],"population":44134693,"flags":{"small":"https://flagcdn.com/w320/ua.png","png":"https://flagcdn.com/w320/ua.png"},"currencies":[{"code":"UAH","name":"Ukrainian hryvnia","symbol":"₴"}],"languages":[{"iso639_1":"uk","iso639_2":"ukr","name":"Ukrainian","nativeName":"Українська"}],"timezones":["UTC+02:00"]},
    {"name":"Japan","capital":["Tokyo"],"population":126960000,"flags":{"small":"https://flagcdn.com/w320/jp.png","png":"https://flagcdn.com/w320/jp.png"},"currencies":[{"code":"JPY","name":"Japanese yen","symbol":"¥"}],"languages":[{"iso639_1":"ja","iso639_2":"jpn","name":"Japanese","nativeName":"日本語"}],"timezones":["UTC+09:00"]},
    {"name":"China","capital":["Beijing"],"population":1402112000,"flags":{"small":"https://flagcdn.com/w320/cn.png","png":"https://flagcdn.com/w320/cn.png"},"currencies":[{"code":"CNY","name":"Chinese yuan","symbol":"¥"}],"languages":[{"iso639_1":"zh","iso639_2":"zho","name":"Chinese","nativeName":"中文"}],"timezones":["UTC+08:00"]},
    {"name":"India","capital":["New Delhi"],"population":1380004385,"flags":{"small":"https://flagcdn.com/w320/in.png","png":"https://flagcdn.com/w320/in.png"},"currencies":[{"code":"INR","name":"Indian rupee","symbol":"₹"}],"languages":[{"iso639_1":"hi","iso639_2":"hin","name":"Hindi","nativeName":"हिन्दी"},{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC+05:30"]},
    {"name":"Australia","capital":["Canberra"],"population":25499884,"flags":{"small":"https://flagcdn.com/w320/au.png","png":"https://flagcdn.com/w320/au.png"},"currencies":[{"code":"AUD","name":"Australian dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC+05:00","UTC+06:30","UTC+07:00","UTC+08:00","UTC+09:30","UTC+10:00"]},
    {"name":"South Africa","capital":["Pretoria","Bloemfontein","Cape Town"],"population":59308690,"flags":{"small":"https://flagcdn.com/w320/za.png","png":"https://flagcdn.com/w320/za.png"},"currencies":[{"code":"ZAR","name":"South African rand","symbol":"R"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"},{"iso639_1":"af","iso639_2":"afr","name":"Afrikaans","nativeName":"Afrikaans"}],"timezones":["UTC+02:00"]},
    {"name":"Egypt","capital":["Cairo"],"population":102334404,"flags":{"small":"https://flagcdn.com/w320/eg.png","png":"https://flagcdn.com/w320/eg.png"},"currencies":[{"code":"EGP","name":"Egyptian pound","symbol":"£"}],"languages":[{"iso639_1":"ar","iso639_2":"ara","name":"Arabic","nativeName":"العربية"}],"timezones":["UTC+02:00"]},
    {"name":"Nigeria","capital":["Abuja"],"population":206139589,"flags":{"small":"https://flagcdn.com/w320/ng.png","png":"https://flagcdn.com/w320/ng.png"},"currencies":[{"code":"NGN","name":"Nigerian naira","symbol":"₦"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC+01:00"]}
];
function searchCountry() {
    search.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = countries.filter(c => c.name.toLowerCase().includes(query));
        currentPage = 1;
        renderPage(filtered);
    });
}


function renderCountry(card) {
    return `
<div class="country" data-name="${card.name}">
    <img src="${card.flags?.small || ''}" alt="${card.name} flag">
    <h2>${card.name}</h2>
    <p><strong>Capital:</strong> ${card.capital.join(", ")}</p>
    <p><strong>Population:</strong> ${card.population}</p>
    <p><strong>Currency:</strong> ${card.currencies.map(c => c.name).join(", ")}</p>
    <p><strong>Languages:</strong> ${card.languages.map(l => l.name).join(", ")}</p>
</div>
    `;
}

function renderPage(data) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = data.slice(start, end);
    
    countriesList.innerHTML = pageItems.map(renderCountry).join("");
    countriesCount.textContent = data.length;
    
    const totalPages = Math.ceil(data.length / itemsPerPage);
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    let paginationHTML = '<div class="pagination">';
    
    paginationHTML += `<button id="prevBtn" ${currentPage === 1 ? 'disabled' : ''}>Back</button>`;
    paginationHTML += `<span>Page ${currentPage} to ${totalPages}</span>`;
    paginationHTML += `<button id="nextBtn" ${currentPage === totalPages ? 'disabled' : ''}>Forward</button>`;
    paginationHTML += '</div>';
    
    let paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        countriesList.after(paginationContainer);
    }
    paginationContainer.innerHTML = paginationHTML;
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(countries);
        }
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(countries);
        }
    });
}

async function getCountries(){
    message.textContent="Loading countries...";
    const response = await fetch (API_URL);
    if (response.ok) {
        const data = await response.json();
        countries = data.slice(0, 36);
        currentPage = 1;
        renderPage(countries);
        message.textContent = "";
    } else {
        message.textContent ="countries not found";
    }
}

renderPage(countries);
getCountries();
searchCountry();

function openModal(country) {
    modalName.textContent = country.name;
    modalFlag.src = country.flags?.small || "";
    modal.classList.add("active");
}
function closeModal() {
    modal.classList.remove("active");
}
countriesList.addEventListener("click", (e) => {
    const countryCard = e.target.closest(".country");
    if (countryCard) {
        const name = countryCard.dataset.name;
        const country = countries.find(c => c.name === name);
        if (country) {
            openModal(country);
        }
    }
});
closeBtn.addEventListener("click", () => {
    closeModal()
})

