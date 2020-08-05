import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<Link href="/"><h1>Chaumière des 4 chateaux</h1></Link>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<Link class="nav-link" activeClassName={style.active} href="/">Home</Link>
					</li>
					<li class="nav-item">
						<Link class="nav-link" activeClassName={style.active} href="/contact">Contact</Link>
					</li>
				</ul>
			</div>
		</nav>
	</header>
);

export default Header;
