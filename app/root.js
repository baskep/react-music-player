import React from 'react';
import Header from './components/header';
import Player from './components/Player';
import MusciList from './components/musiclist';
import {MUSIC_LIST} from './config/musiclist';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Pubsub from 'pubsub-js';

let Root = React.createClass({
	getInitialState() {
        return {
            cuerrentMusicItem: MUSIC_LIST[0], // 首次进入页面，默认播放第一首歌
            musiclist: MUSIC_LIST // 所有音乐列表
        }
    },
    playMusic(musicItem) { // 播放传入的音乐
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
          cuerrentMusicItem: musicItem
        });
    },
    playeNextMusic(tpye = 'next') { // 点击播放下一首或上一首音乐    
        let index = this.findMusicIndex(this.state.cuerrentMusicItem);
        let len = this.state.musiclist.length;
        if(tpye === 'next') {
            index = (index + 1) % len;
        } else {
            index = (index - 1 + len) % len;
        }
        this.playMusic(this.state.musiclist[index]);
    },
    findMusicIndex(musicItem) { // 找到当前所播放的歌曲的索引，以寻找其上一首或下一首歌曲
        return this.state.musiclist.indexOf(musicItem);
    },
    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });

        this.playMusic(this.state.cuerrentMusicItem);

        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playeNextMusic();
        });
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => { // 订阅 PLAY_MUSIC 信息 
            this.playMusic(musicItem)
        });
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => { // 订阅 DELETE_MUSIC 信息 
            this.setState({
            musiclist: this.state.musiclist.filter(item => {
                return item !== musicItem 
            })
          });
        });
        Pubsub.subscribe('PLAY_PRE', () => {
            this.playeNextMusic('pre');
        });
        Pubsub.subscribe('PLAY_NEXT', () => {
            this.playeNextMusic('next');
        });
    },
    componentWillUnMount() { // 组件卸载前解绑事件和消息
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_PRE');
        Pubsub.unsubscribe('PLAY_NEXT');

       $('#player').unbind($.jPlayer.event.ended);
    },
    render() {
        const indexRoute = () => ( // 首页路由
            <Player 
                cuerrentMusicItem={this.state.cuerrentMusicItem} />
        );
        const listRoute = () => ( // 歌曲列表页路由
            <MusciList 
                cuerrentMusicItem={this.state.cuerrentMusicItem} 
                musiclist={this.state.musiclist} />
        );
    return (
        <Router>
            <div>
                <Header/>
                    <Route exact={true} path="/" component={indexRoute} />
                    <Route path="/list" component={listRoute} />
            </div>
        </Router>
        );
    }
});

export default Root;


