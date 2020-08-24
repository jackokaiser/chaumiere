import { h } from 'preact';
import style from './style';
import { usePrerenderData } from '../../components/utils';
import Markdown from 'markdown-to-jsx';
import { Lang } from '../../components/languages';
import { useContext } from 'preact/hooks';

const contact = (props) => {
	const lang = useContext(Lang);
	const [data, isLoading] = usePrerenderData(props);

	if (isLoading || !data || !data.data) {
		return (
			<div>
				<h1 class={`loading`} >&nbsp;</h1>
			</div>
		);
	}
	const { content, metadata } = data.data[lang];

	return (
		<div class={style.pageContact}>
			<Markdown>
				{ content }
			</Markdown>
			<div class="row-fluid no-gutters">
				<div class="col">
					<h2>Adresse:</h2>
					<address>
						2 rue du Kehlenhof<br></br>
						67110 DAMBACH WINECKERTHAL<br></br>
						France
					</address>
				</div>
				<div class="row-fluid no-gutters">
					<iframe class="col" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.1419998487545!2d7.664241515055436!3d49.00788339812418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47968f18f583543f%3A0x7a747e8573cfc812!2s2%20Rue%20du%20Kehlenhof%2C%2067110%20Dambach!5e0!3m2!1sfr!2sfr!4v1596623217139!5m2!1sfr!2sfr" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
				</div>
			</div>
		</div>
	);
};

export default contact;
