import { h } from "preact";
import { usePrerenderData } from '../../components/utils';
import { useContext } from 'preact/hooks';
import { Lang } from '../../components/languages';
import Markdown from 'markdown-to-jsx';

import style from "./style";

const Home = (props) => {
	const lang = useContext(Lang);
	const [data, isLoading] = usePrerenderData(props);

	if (isLoading || !data || !data.data) {
		return (
			<div>
				<h1 class={`loading`} >&nbsp;</h1>
			</div>
		);
	}
	return getPageBody(data.data[lang]);
};

function getPageBody(data) {
	const { content, metadata } = data;
	return (
		<div>
			<div class={style.paral}>
				<div class={`${style.overlay}`}>
					<div class={`${style.overlaytext} align-self-center`}>
						<h1 class="display-3 align-middle">{ metadata.title }</h1>
						<p class="lead align-middle">{ metadata.subtitle }</p>
					</div>
				</div>
			</div>
			<div>
				<Markdown class={style.home}>
					{ content }
				</Markdown>
			</div>
		</div>
	);
};

export default Home;
