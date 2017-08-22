import React, { Component } from 'react';
import './musicListItem.scss';
import Pubsub from 'pubsub-js';

let MusiclistItem = React.createClass({
	playMusic(musicItem) {
		Pubsub.publish('PLAY_MUSIC', musicItem);
	},
	deleteMusic(musicItem, e) {
		Pubsub.publish('DELETE_MUSIC', musicItem);
		e.stopPropagation();
	},
  	render() {
    	let musicItem = this.props.musicItem;
    	return (
        	<li onClick={this.playMusic.bind(this, musicItem)} className={`components-musiclistitem row ${this.props.focus ? 'focus' : ''}`} >
      			<p><strong>{musicItem.title}</strong> -{musicItem.artist}</p>
     	 		<p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
        	</li>
  		);
	}
});

export default MusiclistItem;
