const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');
const parseMD = require('parse-md').default;

const [blogs] = generateFileList(join(__dirname, 'content')).nodes;

function getPageMd(id) {
		const data = parseMD(fs.readFileSync(join('content', 'pages', id + '.md'), 'utf-8'));
		return data;
};

module.exports = () => {
	const pages = [
		{
			url: '/',
			seo: {
				cover: '/assets/chaumiere.jpg',
				title: 'Chaumi&egrave;re des 4 ch&acirc;teaux',
				subtitle: 'Amoureux de la nature et du calme, venez vous ressourcer dans notre maison en toit de chaume enti&egrave;rement r&eacute;nov&eacute;e, nich&eacute;e dans le Parc Naturel R&eacute;gional des Vosges du Nord.'
			},
			data: getPageMd('home')
		},
		{
			url: '/contact/',
			data: getPageMd('contact'),
			seo: {
				title: 'Chaumi&egrave;re des 4 ch&acirc;teaux',
				subtitle: 'Nous contacter'
			}
		},
		{ url: '/contact/success' }
	];

	// adding blogs list posts page
	pages.push({
		url: '/blogs/',
		data: blogs
	});

	// adding all blog pages
	pages.push(...blogs.edges.map(blog => {
		let data;
		if (blog.format === 'md') {
			const { content } = parseMD(fs.readFileSync(join('content', 'blog', blog.id), 'utf-8'));
			data = content;
		} else {
			data = fs.readFileSync(join('content', 'blog', blog.id), 'utf-8').replace(/---(.*(\r)?\n)*---/, '');
		}
		return {
			url: `/blog/${blog.id}`,
			seo: blog.details,
			data: {
				details: blog.details,
				content: data
			}
		};
	}));

	return pages;
};
