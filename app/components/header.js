import React from 'react';
import './header.scss';

let Header = React.createClass({
	render() {
		return (
			<div className="components-header row">
				<img className="-col-auto" src="/static/images/logo.png" width="40" />
				<h1 className="caption">React Music Player</h1>
			</div>
		);
	}
});

export default Header;