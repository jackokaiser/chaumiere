import { h, Component } from 'preact';
import { usePrerenderData } from '../../components/utils';
import { useContext } from 'preact/hooks';
import Markdown from 'markdown-to-jsx';

import style from './style';
import { Lang } from '../../components/languages';

const Gallery = (props) => {
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
		<Markdown class={style.gallery} options={{
			overrides: {
				img: {
					component: GalleryImage
				}
			}
		}}>{ content }</Markdown>
	);
}

function GalleryImage({ alt, title, src }) {
	return (
		<div class={`mb-3 pics animation all 2 ${style.textAlign}`}>
			<img class="img-fluid" src={src} alt={alt} />
			{title && <span class={style.inlineImageTitle}>{title}</span>}
		</div>
	);
}

export default Gallery;
