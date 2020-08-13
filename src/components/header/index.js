import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	constructor() {
		super();
		const internationalText = {
			de: {
				homeLink: '/de',
				contactLink: '/contact/de',
				home: 'Home',
				contact: 'Kontakt',
			},
			fr: {
				homeLink: '/',
				contactLink: '/contact',
				home: 'Home',
				contact: 'Contact',
			}
		};
			this.setState({ internationalText });
	}

	render(props) {
		console.log(props);
		const text = this.state.internationalText[props.lang];
		console.log('text: ',text);
		return (
			<header>
				<nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark justify-content-between">
					<Link class={`${style.lobster} navbar-brand`} href="/">Chaumière des 4 châteaux</Link>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item">
								<Link data-toggle="collapse" class="nav-link" activeClassName="active" href={text.homeLink}>{text.home}</Link>
							</li>
							<li class="nav-item">
								<Link data-toggle="collapse" class="nav-link" activeClassName="active" href={text.contactLink}>{text.contact}</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
};
