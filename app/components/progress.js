import React from 'react';
import './progress.scss';

let Progress = React.createClass({
  hanleProgress(e) {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange(progress);
  },
  render() {
    return (
      <div className="components-progress" onClick={this.hanleProgress} ref="progressBar">
        <div className="progress" style={{width: `${this.props.progress}%`,backgroundColor: `${this.props.barColor}`}}></div> 
      </div>
    );
  }
});

export default Progress;