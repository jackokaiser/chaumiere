import { h } from "preact";
import { useEffect } from 'preact/hooks';
import { usePrerenderData } from '@preact/prerender-data-provider';
import Markdown from 'markdown-to-jsx';

import style from "./style";

const Home = (props) => {
	useEffect(() => {
		if (window !== undefined && window.location.href.includes('#invite_token')) {
			const { href } = window.location;
			window.location.href= `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`;
		}
	},[]);

	const [data, isLoading] = usePrerenderData(props);
	/**
	 * Netlify CMS's accept invite link land on home page.
	 * This redirection takes it to the right place(/admin).
	 */
	return (
		<div class={style.home}>
			{getPageBody(data, isLoading)}
		</div>
	);
};

function getPageBody(data, isLoading) {
	if (isLoading) {
		return (
			<div>
				<h1 class={`loading`} >&nbsp;</h1>
			</div>
		);
	}

	if (data && data.data) {
		const { content, metadata } = data.data;
		return (
			<div>
				<h1 class={style.pageTitle}>{ metadata.title }</h1>
				<p class={style.quote}>{ metadata.subtitle }</p>
				<Markdown>
					{ content }
				</Markdown>
			</div>
		);
	}
};

export default Home;
