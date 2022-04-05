import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export class Menu extends Component {
	render() {
		return (
			<div>
				<em className="login">
					<NavLink className="login" to="/login">
						{' '}
						Login{' '}
					</NavLink>
				</em>
				<em className="login">
					<NavLink className="login" to="/signup">
						{' '}
						Sign up{' '}
					</NavLink>
				</em>
				<em className="login">
					<NavLink className="login" to="/overview">
						{' '}
						Overview{' '}
					</NavLink>
				</em>
				<div class="center">
					{/* <a>
						<span data-attr="Clash">Clash</span>
						<span data-attr="Royale">Royale</span>
					</a> */}
				</div>
			</div>
		);
	}
}
