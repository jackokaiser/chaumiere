const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');
const parseMD = require('parse-md').default;

const [blogs] = generateFileList(join(__dirname, 'content')).nodes;

function getPageMd(id) {
	const getPath = (lang) => join('content', 'pages', lang, id + '.md')
	const readData = (lang) => {
		const path = getPath(lang);
		if (fs.existsSync(path)) return parseMD(fs.readFileSync(path, 'utf-8'));
		/* fallback to french page if language-specific page does not exist */
		return parseMD(fs.readFileSync(getPath('fr'), 'utf-8'));
	}

	const data = {
		fr: readData("fr"),
		de: readData("de")
	};
	return data;
};

module.exports = () => {
	const pages = [
		{
			url: '/',
			data: getPageMd('home'),
			seo: {
				cover: '/assets/chaumiere.jpg',
				title: 'Chaumi&egrave;re des 4 ch&acirc;teaux',
				subtitle: 'Amoureux de la nature et du calme, venez vous ressourcer dans notre maison en toit de chaume enti&egrave;rement r&eacute;nov&eacute;e, nich&eacute;e dans le Parc Naturel R&eacute;gional des Vosges du Nord.'
			}
		},
		{
			url: '/contact/',
			data: getPageMd('contact'),
			seo: {
				title: 'Chaumi&egrave;re des 4 ch&acirc;teaux',
				subtitle: 'Nous contacter'
			}
		},
		{
			url: '/gallery/',
			data: getPageMd('gallery'),
			seo: {
				cover: '/assets/chaumiere.jpg',
				title: 'Chaumi&egrave;re des 4 ch&acirc;teaux',
				subtitle: 'Galerie photos'
			}
		}
	];
	return pages;
};
