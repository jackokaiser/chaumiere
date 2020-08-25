import { h, Component } from 'preact';
import { useContext } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { Lang, setLangInQuery } from '../languages';
import style from './style';

function renderLinks() {
	const lang = useContext(Lang);
	const internationalText = {
		de: {
			homeLink: '/?lang=de',
			contactLink: '/contact/?lang=de',
			galleryLink: '/gallery/?lang=de',
			gallery: 'Fotogalerie',
			home: 'Home',
			contact: 'Kontakt',
		},
		fr: {
			homeLink: '/',
			contactLink: '/contact',
			galleryLink: '/gallery',
			gallery: 'Galerie photos',
			home: 'Home',
			contact: 'Contact',
		}
	};

	const text = internationalText[lang];

	return (
		<ul class="navbar-nav ml-auto">
			<li class="nav-item">
				<Link data-toggle="collapse" class="nav-link" activeClassName="active" href={text.homeLink}>{text.home}</Link>
			</li>
			<li class="nav-item">
				<Link data-toggle="collapse" class="nav-link" activeClassName="active" href={text.galleryLink}>{text.gallery}</Link>
			</li>
			<li class="nav-item">
				<Link data-toggle="collapse" class="nav-link" activeClassName="active" href={text.contactLink}>{text.contact}</Link>
			</li>
		</ul>
	);
}

export default class Header extends Component {
	constructor() {
		super();
	}

	render(props) {
		return (
			<header>
				<nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark justify-content-between">
					<Link class={`${style.lobster} navbar-brand`} href="/">Chaumière des 4 châteaux</Link>
					<div class="btn-group btn-group-toggle" data-toggle="buttons">
						<label onClick={() => {props.setLang('fr')}} class={`${style.fr} btn btn-secondary`}>
							<input type="radio" name="options" id="fr" autocomplete="off"/>
						</label>
						<label onClick={() => {props.setLang('de')}} class={`${style.de} btn btn-secondary`}>
							<input type="radio" name="options" id="de" autocomplete="off"/>
						</label>
					</div>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						{ renderLinks() }
					</div>
				</nav>
			</header>
		);
	}
};
