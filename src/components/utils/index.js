import { usePrerenderData as OriginalUsePrerenderData } from '@preact/prerender-data-provider';

const usePrerenderData = (props) => {
	const url = props.url.split("?")[0];
	return OriginalUsePrerenderData({ url });
}

export { usePrerenderData };
