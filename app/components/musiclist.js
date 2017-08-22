import React from 'react';
import MusiclistItem from '../components/musicListItem';

let MusciList = React.createClass({
	render() {
		var listEle = this.props.musiclist.map((item) => {
			return <MusiclistItem key={item.id} musicItem={item} focus={item === this.props.cuerrentMusicItem}>
						{item.title}
					</MusiclistItem>
		});

		return (
			<ul> {listEle}
			</ul>
		);
	}
});

export default MusciList;