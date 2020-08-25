import { h, Component } from 'preact';
import { useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { Provider } from '@preact/prerender-data-provider';
import Header from './header';
import { Lang, getLangFromQuery, setLangInQuery } from './languages';

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
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render(props) {
		const [lang, setLang] = useState(getLangFromQuery());
		const setLangAndUrl = l => {
			setLang(l);
			setLangInQuery(l);
		};

		return (
			<Provider value={props}>
				<Lang.Provider value={lang}>
					<div id="app">
						<Header setLang={setLangAndUrl} />
						<Router onChange={this.handleRoute}>
							<Home path="/" />
							<Contact path="/contact/" />
							<NotFoundPage type="404" default />
						</Router>
					</div>
				</Lang.Provider>
			</Provider>
		);
	}
}
