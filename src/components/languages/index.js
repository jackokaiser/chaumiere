import { createContext } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';

const Lang = createContext('fr');

const validLang = ['fr', 'de'];

function getLangFromQuery() {
	if (typeof window === 'undefined') {
		return 'fr';
	}

	let url = window.location.href;
	let name = "lang";
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
	var results = regex.exec(url);

	if (!results || !results[2]) return 'fr';

	let decoded = decodeURIComponent(results[2].replace(/\+/g, ' '));
	if (!validLang.includes(decoded)) return 'fr';
	return decoded;
}

function setLangInQuery(lang) {
	if ((typeof window === 'undefined') || !validLang.includes(lang) || getLangFromQuery() === lang) {
		console.log("Not changing language in URL");
		return;
	}
	let url = window.location.pathname;
	const key = 'lang';

	let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	let separator = url.indexOf('?') !== -1 ? "&" : "?";
	let targetUrl = '';
	if (lang === 'fr') {
		// default language - we just want to remove the query string
		targetUrl = url.replace(re, '');
	}
	else if (url.match(re)) {
		targetUrl = url.replace(re, '$1' + key + "=" + lang + '$2');
	}
	else {
		targetUrl = url + separator + key + "=" + lang;
	}
	route(targetUrl, true);
}

export { Lang, getLangFromQuery, setLangInQuery };
