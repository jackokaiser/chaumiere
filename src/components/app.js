import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from '@preact/prerender-data-provider';
import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Blogs from '../routes/blogs';
import Blog from '../routes/blog';
import Contact from '../routes/contact';
import ContactSuccess from '../routes/contact-success';
import NotFoundPage from '../routes/notfound';

export default class App extends Component {
	constructor() {
		super();
		this.state = { lang: 'fr' };
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
		const urlEnd = e.url.split('?')[0].split('/').slice(-1)[0];
		const languages = ['fr', 'de'];
		const lang = languages.includes(urlEnd) ? urlEnd : 'fr';
		this.setState({ lang });
	};

	render(props) {
		return (
			<Provider value={props}>
				<div id="app">
					<Header lang={this.state.lang} />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Home path="/de" />
						<Contact path="/contact/" />
						<Contact path="/contact/de" />
						<NotFoundPage type="404" default />
					</Router>
				</div>
			</Provider>
		);
	}
}
