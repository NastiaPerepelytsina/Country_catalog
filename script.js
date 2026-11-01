const API_URL = `https://restcountries.com/v3.1/all`;
const search = document.getElementById("search");
const region = document.getElementById("region");
const countriesList = document.getElementById("countriesList");
const countriesCount = document.getElementById("count");
const message = document.getElementById("message");
const modal = document.getElementById("modal");
const modalFlag = document.getElementById("modalFlag");
const modalName = document.getElementById("modalName");
const closeBtn = document.getElementById("closeBtn");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "☀️ Light mode";
    } else {
        themeToggle.textContent = "🌙 Dark mode";
    }
});

let currentPage = 1;
const itemsPerPage = 8;
let currentList = [];

let countries = [
    {"name":"United States of America","region":"Americas","capital":["Washington, D.C."],"population":331002651,"flags":{"small":"https://flagcdn.com/w320/us.png","png":"https://flagcdn.com/w320/us.png"},"currencies":[{"code":"USD","name":"United States dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC-05:00","UTC-04:00","UTC-06:00","UTC-07:00","UTC-08:00"]},
    {"name":"Canada","region":"Americas","capital":["Ottawa"],"population":37742154,"flags":{"small":"https://flagcdn.com/w320/ca.png","png":"https://flagcdn.com/w320/ca.png"},"currencies":[{"code":"CAD","name":"Canadian dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"},{"iso639_1":"fr","iso639_2":"fra","name":"French","nativeName":"français"}],"timezones":["UTC-04:00","UTC-05:00","UTC-06:00","UTC-07:00","UTC-08:00"]},
    {"name":"Mexico","region":"Americas","capital":["Mexico City"],"population":128932753,"flags":{"small":"https://flagcdn.com/w320/mx.png","png":"https://flagcdn.com/w320/mx.png"},"currencies":[{"code":"MXN","name":"Mexican peso","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-06:00","UTC-07:00","UTC-08:00"]},
    {"name":"Brazil","region":"Americas","capital":["Brasília"],"population":212559417,"flags":{"small":"https://flagcdn.com/w320/br.png","png":"https://flagcdn.com/w320/br.png"},"currencies":[{"code":"BRL","name":"Brazilian real","symbol":"R$"}],"languages":[{"iso639_1":"pt","iso639_2":"por","name":"Portuguese","nativeName":"Português"}],"timezones":["UTC-03:00","UTC-04:00","UTC-05:00"]},
    {"name":"Argentina","region":"Americas","capital":["Buenos Aires"],"population":45195774,"flags":{"small":"https://flagcdn.com/w320/ar.png","png":"https://flagcdn.com/w320/ar.png"},"currencies":[{"code":"ARS","name":"Argentine peso","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-03:00"]},
    {"name":"Colombia","region":"Americas","capital":["Bogotá"],"population":50882891,"flags":{"small":"https://flagcdn.com/w320/co.png","png":"https://flagcdn.com/w320/co.png"},"currencies":[{"code":"COP","name":"Colombian peso","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-05:00"]},
    {"name":"Chile","region":"Americas","capital":["Santiago"],"population":19116201,"flags":{"small":"https://flagcdn.com/w320/cl.png","png":"https://flagcdn.com/w320/cl.png"},"currencies":[{"code":"CLP","name":"Chilean peso","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-04:00","UTC-03:00"]},
    {"name":"Peru","region":"Americas","capital":["Lima"],"population":32971854,"flags":{"small":"https://flagcdn.com/w320/pe.png","png":"https://flagcdn.com/w320/pe.png"},"currencies":[{"code":"PEN","name":"Peruvian sol","symbol":"S/."}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-05:00"]},
    {"name":"Venezuela","region":"Americas","capital":["Caracas"],"population":28435940,"flags":{"small":"https://flagcdn.com/w320/ve.png","png":"https://flagcdn.com/w320/ve.png"},"currencies":[{"code":"VEF","name":"Venezuelan bolívar","symbol":"Bs"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-04:00"]},
    {"name":"Ecuador","region":"Americas","capital":["Quito"],"population":17643054,"flags":{"small":"https://flagcdn.com/w320/ec.png","png":"https://flagcdn.com/w320/ec.png"},"currencies":[{"code":"USD","name":"United States dollar","symbol":"$"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC-05:00","UTC-06:00"]},
    {"name":"United Kingdom of Great Britain and Northern Ireland","region":"Europe","capital":["London"],"population":67886011,"flags":{"small":"https://flagcdn.com/w320/gb.png","png":"https://flagcdn.com/w320/gb.png"},"currencies":[{"code":"GBP","name":"British pound","symbol":"£"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC"]},
    {"name":"France","region":"Europe","capital":["Paris"],"population":65273511,"flags":{"small":"https://flagcdn.com/w320/fr.png","png":"https://flagcdn.com/w320/fr.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"fr","iso639_2":"fra","name":"French","nativeName":"français"}],"timezones":["UTC+01:00"]},
    {"name":"Germany","region":"Europe","capital":["Berlin"],"population":83783942,"flags":{"small":"https://flagcdn.com/w320/de.png","png":"https://flagcdn.com/w320/de.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"de","iso639_2":"deu","name":"German","nativeName":"Deutsch"}],"timezones":["UTC+01:00"]},
    {"name":"Italy","region":"Europe","capital":["Rome"],"population":60461826,"flags":{"small":"https://flagcdn.com/w320/it.png","png":"https://flagcdn.com/w320/it.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"it","iso639_2":"ita","name":"Italian","nativeName":"Italiano"}],"timezones":["UTC+01:00"]},
    {"name":"Spain","region":"Europe","capital":["Madrid"],"population":46438422,"flags":{"small":"https://flagcdn.com/w320/es.png","png":"https://flagcdn.com/w320/es.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"es","iso639_2":"spa","name":"Spanish","nativeName":"Español"}],"timezones":["UTC","UTC+01:00"]},
    {"name":"Portugal","region":"Europe","capital":["Lisbon"],"population":10196709,"flags":{"small":"https://flagcdn.com/w320/pt.png","png":"https://flagcdn.com/w320/pt.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"pt","iso639_2":"por","name":"Portuguese","nativeName":"Português"}],"timezones":["UTC","UTC-01:00"]},
    {"name":"Netherlands","region":"Europe","capital":["Amsterdam"],"population":17134872,"flags":{"small":"https://flagcdn.com/w320/nl.png","png":"https://flagcdn.com/w320/nl.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"nl","iso639_2":"nld","name":"Dutch","nativeName":"Nederlands"}],"timezones":["UTC+01:00"]},
    {"name":"Belgium","region":"Europe","capital":["Brussels"],"population":11589623,"flags":{"small":"https://flagcdn.com/w320/be.png","png":"https://flagcdn.com/w320/be.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"nl","iso639_2":"nld","name":"Dutch","nativeName":"Nederlands"},{"iso639_1":"fr","iso639_2":"fra","name":"French","nativeName":"français"},{"iso639_1":"de","iso639_2":"deu","name":"German","nativeName":"Deutsch"}],"timezones":["UTC+01:00"]},
    {"name":"Switzerland","region":"Europe","capital":["Bern"],"population":8654622,"flags":{"small":"https://flagcdn.com/w320/ch.png","png":"https://flagcdn.com/w320/ch.png"},"currencies":[{"code":"CHF","name":"Swiss franc","symbol":"Fr"}],"languages":[{"iso639_1":"de","iso639_2":"deu","name":"German","nativeName":"Deutsch"},{"iso639_1":"fr","iso639_2":"fra","name":"French","nativeName":"français"},{"iso639_1":"it","iso639_2":"ita","name":"Italian","nativeName":"Italiano"}],"timezones":["UTC+01:00"]},
    {"name":"Austria","region":"Europe","capital":["Vienna"],"population":9006398,"flags":{"small":"https://flagcdn.com/w320/at.png","png":"https://flagcdn.com/w320/at.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"de","iso639_2":"deu","name":"German","nativeName":"Deutsch"}],"timezones":["UTC+01:00"]},
    {"name":"Sweden","region":"Europe","capital":["Stockholm"],"population":10099265,"flags":{"small":"https://flagcdn.com/w320/se.png","png":"https://flagcdn.com/w320/se.png"},"currencies":[{"code":"SEK","name":"Swedish krona","symbol":"kr"}],"languages":[{"iso639_1":"sv","iso639_2":"swe","name":"Swedish","nativeName":"svenska"}],"timezones":["UTC+01:00"]},
    {"name":"Norway","region":"Europe","capital":["Oslo"],"population":5421241,"flags":{"small":"https://flagcdn.com/w320/no.png","png":"https://flagcdn.com/w320/no.png"},"currencies":[{"code":"NOK","name":"Norwegian krone","symbol":"kr"}],"languages":[{"iso639_1":"no","iso639_2":"nor","name":"Norwegian","nativeName":"Norsk"}],"timezones":["UTC+01:00"]},
    {"name":"Denmark","region":"Europe","capital":["Copenhagen"],"population":5792202,"flags":{"small":"https://flagcdn.com/w320/dk.png","png":"https://flagcdn.com/w320/dk.png"},"currencies":[{"code":"DKK","name":"Danish krone","symbol":"kr"}],"languages":[{"iso639_1":"da","iso639_2":"dan","name":"Danish","nativeName":"dansk"}],"timezones":["UTC+01:00"]},
    {"name":"Finland","region":"Europe","capital":["Helsinki"],"population":5540720,"flags":{"small":"https://flagcdn.com/w320/fi.png","png":"https://flagcdn.com/w320/fi.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"fi","iso639_2":"fin","name":"Finnish","nativeName":"suomi"},{"iso639_1":"sv","iso639_2":"swe","name":"Swedish","nativeName":"svenska"}],"timezones":["UTC+02:00"]},
    {"name":"Poland","region":"Europe","capital":["Warsaw"],"population":37846611,"flags":{"small":"https://flagcdn.com/w320/pl.png","png":"https://flagcdn.com/w320/pl.png"},"currencies":[{"code":"PLN","name":"Polish złoty","symbol":"zł"}],"languages":[{"iso639_1":"pl","iso639_2":"pol","name":"Polish","nativeName":"język polski"}],"timezones":["UTC+01:00"]},
    {"name":"Greece","region":"Europe","capital":["Athens"],"population":10423054,"flags":{"small":"https://flagcdn.com/w320/gr.png","png":"https://flagcdn.com/w320/gr.png"},"currencies":[{"code":"EUR","name":"Euro","symbol":"€"}],"languages":[{"iso639_1":"el","iso639_2":"ell","name":"Greek","nativeName":"Ελληνικά"}],"timezones":["UTC+02:00"]},
    {"name":"Turkey","region":"Asia","capital":["Ankara"],"population":84339067,"flags":{"small":"https://flagcdn.com/w320/tr.png","png":"https://flagcdn.com/w320/tr.png"},"currencies":[{"code":"TRY","name":"Turkish lira","symbol":"₺"}],"languages":[{"iso639_1":"tr","iso639_2":"tur","name":"Turkish","nativeName":"Türkçe"}],"timezones":["UTC+03:00"]},
    {"name":"Russia","region":"Europe","capital":["Moscow"],"population":145934462,"flags":{"small":"https://flagcdn.com/w320/ru.png","png":"https://flagcdn.com/w320/ru.png"},"currencies":[{"code":"RUB","name":"Russian ruble","symbol":"₽"}],"languages":[{"iso639_1":"ru","iso639_2":"rus","name":"Russian","nativeName":"Русский"}],"timezones":["UTC+02:00","UTC+03:00","UTC+04:00","UTC+06:00","UTC+07:00","UTC+08:00","UTC+09:00","UTC+10:00","UTC+11:00","UTC+12:00"]},
    {"name":"Ukraine","region":"Europe","capital":["Kyiv"],"population":44134693,"flags":{"small":"https://flagcdn.com/w320/ua.png","png":"https://flagcdn.com/w320/ua.png"},"currencies":[{"code":"UAH","name":"Ukrainian hryvnia","symbol":"₴"}],"languages":[{"iso639_1":"uk","iso639_2":"ukr","name":"Ukrainian","nativeName":"Українська"}],"timezones":["UTC+02:00"]},
    {"name":"Japan","region":"Asia","capital":["Tokyo"],"population":126960000,"flags":{"small":"https://flagcdn.com/w320/jp.png","png":"https://flagcdn.com/w320/jp.png"},"currencies":[{"code":"JPY","name":"Japanese yen","symbol":"¥"}],"languages":[{"iso639_1":"ja","iso639_2":"jpn","name":"Japanese","nativeName":"日本語"}],"timezones":["UTC+09:00"]},
    {"name":"China","region":"Asia","capital":["Beijing"],"population":1402112000,"flags":{"small":"https://flagcdn.com/w320/cn.png","png":"https://flagcdn.com/w320/cn.png"},"currencies":[{"code":"CNY","name":"Chinese yuan","symbol":"¥"}],"languages":[{"iso639_1":"zh","iso639_2":"zho","name":"Chinese","nativeName":"中文"}],"timezones":["UTC+08:00"]},
    {"name":"India","region":"Asia","capital":["New Delhi"],"population":1380004385,"flags":{"small":"https://flagcdn.com/w320/in.png","png":"https://flagcdn.com/w320/in.png"},"currencies":[{"code":"INR","name":"Indian rupee","symbol":"₹"}],"languages":[{"iso639_1":"hi","iso639_2":"hin","name":"Hindi","nativeName":"हिन्दी"},{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC+05:30"]},
    {"name":"Australia","region":"Oceania","capital":["Canberra"],"population":25499884,"flags":{"small":"https://flagcdn.com/w320/au.png","png":"https://flagcdn.com/w320/au.png"},"currencies":[{"code":"AUD","name":"Australian dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC+05:00","UTC+06:30","UTC+07:00","UTC+08:00","UTC+09:30","UTC+10:00"]},
    {"name":"South Africa","region":"Africa","capital":["Pretoria","Bloemfontein","Cape Town"],"population":59308690,"flags":{"small":"https://flagcdn.com/w320/za.png","png":"https://flagcdn.com/w320/za.png"},"currencies":[{"code":"ZAR","name":"South African rand","symbol":"R"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"},{"iso639_1":"af","iso639_2":"afr","name":"Afrikaans","nativeName":"Afrikaans"}],"timezones":["UTC+02:00"]},
    {"name":"Egypt","region":"Africa","capital":["Cairo"],"population":102334404,"flags":{"small":"https://flagcdn.com/w320/eg.png","png":"https://flagcdn.com/w320/eg.png"},"currencies":[{"code":"EGP","name":"Egyptian pound","symbol":"£"}],"languages":[{"iso639_1":"ar","iso639_2":"ara","name":"Arabic","nativeName":"العربية"}],"timezones":["UTC+02:00"]},
    {"name":"Nigeria","region":"Africa","capital":["Abuja"],"population":206139589,"flags":{"small":"https://flagcdn.com/w320/ng.png","png":"https://flagcdn.com/w320/ng.png"},"currencies":[{"code":"NGN","name":"Nigerian naira","symbol":"₦"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"timezones":["UTC+01:00"]}
];

function getCountryName(country) {
    if (!country || !country.name) return "";
    if (typeof country.name === "object") {
        return country.name.common || country.name.official || "";
    }
    return String(country.name);
}

function renderCountry(card) {
    const name = getCountryName(card);
    const capital = Array.isArray(card.capital) ? card.capital.join(", ") : (card.capital || "N/A");
    const population = typeof card.population === "number" ? card.population.toLocaleString() : (card.population || "N/A");
    const currency = Array.isArray(card.currencies)
        ? card.currencies.map(c => c.name || c.code || c).join(", ")
        : (card.currencies && typeof card.currencies === "object"
            ? Object.values(card.currencies).map(c => c.name || c).join(", ")
            : "N/A");
    const languages = Array.isArray(card.languages)
        ? card.languages.map(l => l.name || l).join(", ")
        : (card.languages && typeof card.languages === "object"
            ? Object.values(card.languages).join(", ")
            : "N/A");
    const regionInfo = card.region ? `<p><strong>Region:</strong> ${card.region}</p>` : "";

    return `
<div class="country" data-name="${name}">
    <img src="${card.flags?.small || card.flags?.png || ''}" alt="${name} flag">
    <h2>${name}</h2>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Currency:</strong> ${currency}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    ${regionInfo}
</div>
    `;
}

function renderPagination(totalPages) {
    let paginationContainer = document.querySelector(".pagination");
    if (!paginationContainer) {
        paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination";
        countriesList.after(paginationContainer);
    }

    if (totalPages <= 0) {
        paginationContainer.innerHTML = "";
        return;
    }

    let paginationHTML = "";
    paginationHTML += `<button id="prevBtn" ${currentPage === 1 ? "disabled" : ""}>Back</button>`;
    paginationHTML += `<span>Page ${currentPage} of ${totalPages}</span>`;
    paginationHTML += `<button id="nextBtn" ${currentPage === totalPages ? "disabled" : ""}>Forward</button>`;

    paginationContainer.innerHTML = paginationHTML;

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentList);
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentList);
        }
    });
}

function renderPage(data) {
    currentList = data;
    countriesCount.textContent = data.length;

    if (data.length === 0) {
        countriesList.innerHTML = `<p class="no-results">No countries found</p>`;
        renderPagination(0);
        return;
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage > totalPages) {
        currentPage = 1;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = data.slice(start, end);

    countriesList.innerHTML = pageItems.map(renderCountry).join("");
    renderPagination(totalPages);
}

function populateRegions() {
    const selected = region.value || "all";
    const regions = Array.from(new Set(countries.map(c => c.region).filter(Boolean))).sort();
    let optionsHTML = `<option value="all">All regions</option>`;
    regions.forEach(r => {
        optionsHTML += `<option value="${r}">${r}</option>`;
    });
    region.innerHTML = optionsHTML;
    if (regions.includes(selected) || selected === "all") {
        region.value = selected;
    } else {
        region.value = "all";
    }
}

function applyFilters() {
    const query = search.value.trim().toLowerCase();
    const selectedRegion = region.value;

    const filtered = countries.filter(c => {
        const name = getCountryName(c).toLowerCase();
        const matchesSearch = name.includes(query);
        const matchesRegion = selectedRegion === "all" || (c.region && c.region.toLowerCase() === selectedRegion.toLowerCase());
        return matchesSearch && matchesRegion;
    });

    currentPage = 1;
    renderPage(filtered);
}

search.addEventListener("input", applyFilters);
region.addEventListener("change", applyFilters);

async function getCountries() {
    message.textContent = "Loading countries...";
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (!response.ok || !Array.isArray(data)) {
            message.textContent = "";
            return;
        }
        countries = data.slice(0, 36);
        currentPage = 1;
        populateRegions();
        applyFilters();
        message.textContent = "";
    } catch (error) {
        message.textContent = "";
    }
}

function openModal(country) {
    const name = getCountryName(country);
    modalName.textContent = name;
    modalFlag.src = country.flags?.small || country.flags?.png || "";
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

countriesList.addEventListener("click", (e) => {
    const countryCard = e.target.closest(".country");
    if (countryCard) {
        const name = countryCard.dataset.name;
        const country = countries.find(c => getCountryName(c) === name);
        if (country) {
            openModal(country);
        }
    }
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

populateRegions();
renderPage(countries);
getCountries();

