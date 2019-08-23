import React from 'react';
import Loading from './Loading';
import {formatTime} from '../util';

import '../videoPlayer.css';

const CAN_PLAY = 'CAN_PLAY';

export default class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			showLayer: false,
			totalTime: null,
			currTime: 0,
			offsetWidth: 0,
			loading: false,
		};
		this.videoRef = null;
		this.barRef = null;
		this.containerRef = null;
		this.tid = 0;
		this.startX = 0;
    this.barWidth = 0;
		this.status = null;
		this.preOffset = 0;
		this.touchStart = false;
	}

	componentDidMount() {
		this.videoRef.addEventListener('ended', this.playerEndListener, false);
		this.videoRef.addEventListener('durationchange', this.playerDurationListener, false);
		this.videoRef.addEventListener('timeupdate', this.timeUpdateListener, false);
		this.videoRef.addEventListener('canplay', this.canPlayListener, false);
		this.videoRef.addEventListener('webkitendfullscreen', this.exitFullScreen, false);
		this.barWidth = this.barRef && this.barRef.getBoundingClientRect().width;
		this.ch = this.containerRef.getBoundingClientRect().width * 0.5625;
	}

	componentWillUnmount() {
		this.videoRef.removeEventListener('ended', this.playerEndListener, false);
		this.videoRef.removeEventListener('durationchange', this.playerDurationListener, false);
		this.videoRef.removeEventListener('timeupdate', this.timeUpdateListener, false);
		this.videoRef.removeEventListener('canplay', this.canPlayListener, false);
		this.videoRef.removeEventListener('webkitendfullscreen', this.exitFullScreen, false);
	}

	playerDurationListener = () => {
		this.setState({totalTime: this.videoRef.duration});
	};

	playerEndListener = () => {
		this.setState({isPlaying: false, showLayer: false});
		clearTimeout(this.tid);
	};

	timeUpdateListener = () => {
		const vr = this.videoRef;
		let per = 0;
		if (vr.duration) {
			per = (vr.currentTime / vr.duration).toFixed(3);
		}
		this.setState({currTime: vr.currentTime, offsetWidth: this.barWidth * per});
	};

	moveStart = e => {
		this.startX = e.touches[0].clientX;
		this.touchStart = true;
	};

	touchMove = e => {
		let offset = 0;
		if(this.touchStart) {
			offset = e.changedTouches[0].clientX - this.startX;
			this.preOffset = e.changedTouches[0].clientX;
			this.touchStart = false;
		} else {
			offset = e.changedTouches[0].clientX - this.preOffset;
			this.preOffset = e.changedTouches[0].clientX;
		}

		let x =  this.state.offsetWidth + offset;
		if (x > this.barWidth) {
			x = this.barWidth;
		} else if (x < 0) {
			x = 0;
		}
		const per = (x / this.barWidth).toFixed(3);
		const t = (this.videoRef.currentTime = (this.state.totalTime * per).toFixed(0));
		this.setState({currTime: t, offsetWidth: x});
	};

	popLayer = () => {
		clearTimeout(this.tid);
		if (this.state.isPlaying) {
			this.setState({showLayer: !this.state.showLayer});
			this.tid = setTimeout(() => {
				this.setState({showLayer: !this.state.showLayer});
			}, 1500);
		} else {
			return;
		}
	};

	canPlayListener = () => {
		this.status = CAN_PLAY;
		this.setState({loading: false});
	};

	startPlay = () => {
		this.videoRef.play();
		this.setState({isPlaying: true, showLayer: false});
		if(this.status !== CAN_PLAY) {
			this.setState({loading: true});
		}
	};

	play = e => {
		e && e.stopPropagation();
		this.startPlay();
	};

	pause = e => {
		e.stopPropagation();
		this.videoRef.pause();
		this.setState({isPlaying: false, showLayer: true});
		clearTimeout(this.tid);
	};

	exitFullScreen = () => {
		this.setState({isPlaying: false, showLayer: true});
	};

	fullScreen = (e) => {
		e.stopPropagation();
		const v = this.videoRef;
		if(v.requestFullscreen) {
			v.requestFullscreen();
		} else if(v.webkitEnterFullscreen) {
			v.webkitEnterFullscreen();
		}  else if(v.webkitRequestFullscreen) {
			v.webkitRequestFullscreen();
		} else if(v.mozRequestFullScreen) {
			v.mozRequestFullScreen();
		} else if(v.msRequestFullScreen) {
			v.msRequestFullScreen();
		}
	};

	render() {
		const {isPlaying, showLayer, currTime, totalTime, offsetWidth, loading} = this.state;
		const {img, src} = this.props;
		return (
			<div
				className="video-container"
				onClick={this.popLayer}
				onTouchStart={this.moveStart}
				onTouchMove={this.touchMove}
				ref={(ref) => this.containerRef = ref}
				style={{height: this.ch}}
			>
				<video
					ref={videoRef => (this.videoRef = videoRef)}
					webkit-playsinline="true"
					playsInline="true"
					x-webkit-airplay="allow"
					x5-playsinline="true"
					poster={img}
				>
					<source src={src} type="video/mp4" />
					您的浏览器不支持Video
				</video>
				{loading ? (
					<Loading />
				) : (
					<React.Fragment>
            <div className={`layer ${isPlaying && !showLayer ? 'hide' : ''}`} />
						<i className={`icon play ${isPlaying ? 'hide' : ''}`} onClick={this.play} />
						<i className={`icon pause ${isPlaying && showLayer ? '' : 'hide'}`} onClick={this.pause} />
						{totalTime > 0 && !isPlaying && !showLayer && <span className={`timer`}>{formatTime(totalTime)}</span>}
						<div className={`progress ${!showLayer ? 'low-index' : ''}`}>
							<span className="cur-time">{formatTime(currTime)}</span>
							<span className="bar" ref={barRef => (this.barRef = barRef)}>
								<span className="innerbar" style={{width: offsetWidth}} />
								<i className="circle-icon" style={{left: offsetWidth}} />
							</span>
							<span className="timer-pad">{formatTime(totalTime)}</span>
							<i className="fs" onClick={this.fullScreen} />
						</div>
					</React.Fragment>
				)} 
			</div>
		);
	}
}
