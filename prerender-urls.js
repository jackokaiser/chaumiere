const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');
const parseMD = require('parse-md').default;

const [blogs] = generateFileList(join(__dirname, 'content')).nodes;

function getPageMd(id, lang='fr') {
	const data = parseMD(fs.readFileSync(join('content', 'pages', lang, id + '.md'), 'utf-8'));
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
			url: '/de',
			data: getPageMd('home', 'de'),
			seo: {
				cover: '/assets/chaumiere.jpg',
				title: 'Chaumi&egrave;re des 4 ch&acirc;teaux',
				subtitle: 'Liebhaber der Natur und der Ruhe k&ouml;nnen in unserem vollst&auml;ndig renovierten Reetdachhaus im regionalen Naturpark Vosges du Nord neue Energie tanken.'
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
			url: '/contact/de',
			data: getPageMd('contact', 'de'),
			seo: {
				title: 'Chaumi&egrave;re des 4 ch&acirc;teaux',
				subtitle: 'Kontaktieren Sie uns'
			}
		}
	];
	return pages;
};
