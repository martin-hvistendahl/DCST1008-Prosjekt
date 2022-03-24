import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

export class AddOne extends Component {
	team = '';
	name1 = '';
	trophies1 = '';
	teams = [];
	form = null;

	render() {
		return (
			<div>
				<form ref={(instance) => (this.form = instance)}>
					<br />
					<br /> Player 1
					<input
						type="text"
						value={this.name1}
						placeholder="Nickname"
						size="10"
						onChange={(event) => (this.name1 = event.currentTarget.value)}
						required
					/>
					<input
						type="number"
						value={this.trophies1}
						placeholder="Trophies"
						size="10"
						onChange={(event) => (this.trophies1 = event.currentTarget.value)}
						required
					/>			
					<br />
					<br />
					<button type="button" onClick={this.buttonClicked}>
						Add team
					</button>
				</form>
				<NavLink to="/bracket">
					<button
						style={{
							backgroundColor: 'blue',
              size: 'large',
              marginLeft: '700px',
							marginTop: '10px',
							height: '40px',
							width: '100px',
						}}
						type="button"
					>
						Create Tournament
					</button>
				</NavLink>
				<br />
				<div>
					{this.teams.map((team, i) => (
						<div key={i}>
						
							<em key={1}>
								Name: {team[1][0]} Trophies {team[1][1]}
							</em>

							<button type="button" onClick={(i) => this.teams.splice(i, 1)}>
								x
							</button>
							<br />
							<br />
						</div>
					))}
				</div>
			</div>
		);
	}

	buttonClicked() {
		// if (!this.form.reportValidity()) return;

		this.teams.push([this.team, [this.name1, this.trophies1], [this.name2, this.trophies2]]);

		console.log(this.teams);

		// let ny = React.createElement("div", {}, "Team: " + this.team + ' Name: ' + this.name1 + ' Trophies: ' + this.trophies1 +
		//                                         ' Name: ' + this.name2 + ' Trophies: ' + this.trophies2)

		// let nytt = document.createElement("div")
		// nytt.id = 'nytt';
		// document.body.appendChild(nytt);

		// ReactDOM.render(
		//   ny,
		//   document.getElementById('nytt')
		// );
	}
}
