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
	return getPageBody(data, isLoading);
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
				<div class={style.paral}>
					<div class={ style.overlay + " container-fluid align-self-center" }>
						<h1 class="display-3 align-middle">{ metadata.title }</h1>
						<p class="lead align-middle">{ metadata.subtitle }</p>
					</div>
				</div>
				<div class="container-fluid">
					<Markdown class={style.home}>
						{ content }
					</Markdown>
				</div>
			</div>
		);
	}
};

export default Home;
