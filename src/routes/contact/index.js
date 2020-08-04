import { h } from 'preact';
import style from './style';

const photographs = (props) => {
	return (
			<div class={style.pageContact}>
				<h1 class={style.pageTitle}>Pour nous contacter:</h1>
				<div>
					<p>
						<ul>
							<li>télèphone Thérèse: 06 32 16 35 44 </li>
							<li>télèphone Gilles: 06 85 65 21 12 (spricht deutsch)</li>
							<li>mail: chaumieredes4chateaux@gmail.com</li>
						</ul>
					</p>
				</div>
				<h1 class={style.pageTitle}>Adresse:</h1>
				<div>
					<div>2 rue du Kehlenhof</div>
					<div>67110 DAMBACH WINECKERTHAL</div>
					<div>France</div>
				</div>
			</div>
	);
};

export default photographs;
