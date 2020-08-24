import { createContext } from 'preact';

const validLang = ['fr', 'de'];

function getLangFromQuery() {
	if (!window) {
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
	if (!window || !validLang.includes(lang) || getLangFromQuery() === lang) {
		console.log("Not changing language in URL");
		return;
	}
	let url = window.location.href;
	const key = 'lang';

	let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	let separator = url.indexOf('?') !== -1 ? "&" : "?";
	if (lang === 'fr') {
		// default language - we just want to remove the query string
		window.location.href = url.replace(re, '');
	}
	else if (url.match(re)) {
		window.location.href = url.replace(re, '$1' + key + "=" + lang + '$2');
	}
	else {
		window.location.href = url + separator + key + "=" + lang;
	}
}

const Lang = createContext('fr');

const LangFromQueryUrl = ({ children, ...props }) => {
	let lang = getLangFromQuery();
	return (
		<Lang.Provider value={lang}>
			{ children }
		</Lang.Provider>
	);
}

export { Lang, LangFromQueryUrl, setLangInQuery };
