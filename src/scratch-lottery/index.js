import React from 'react';
import './index.css';

const prizeData = ['未中奖', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖'];

export default class Scratch extends React.Component {
  canRef = null;
  state = {level: null};
  ctx = null;
  md = false;

  init() {
    this.ctx = this.canRef.getContext('2d');
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(0, 0, 300, 200);
    this.ctx.globalCompositeOperation = 'destination-out';
  }

  getPrizeLevel = () => {
    const l = Math.floor(Math.random() * 7);
    this.setState({level: l});
  };

  scratchLottery = (e) => {
    if(this.md) {
      if(e.touches && e.touches[0]) {
        e = e.touches[0];
      }
      const x = e.pageX - this.canRef.offsetLeft;
      const y = e.pageY - this.canRef.offsetTop;
  
      this.ctx.beginPath();
      this.ctx.arc(x, y, 16, 0, Math.PI * 2, true);
      this.ctx.fill();
    }
  };

  start = () => {
    this.md = true;
  }

  end = () => {
    this.md = false;
  }

  componentDidMount() {
    this.init();
    this.getPrizeLevel();
  }

  render() {
    return (
      <div className="scratch">
        <div className="bg">
          <div>{this.state.level > 0 ? `恭喜你！获得${prizeData[this.state.level]}` : '很遗憾，没有中奖'}</div>
        </div>
        <canvas
          id="canvas"
          ref={el => this.canRef = el}
          width={300}
          height={200}
          onTouchStart={this.start}
          onTouchMove={this.scratchLottery}
          onTouchEnd={this.end}
          onMouseDown={this.start}
          onMouseMove={this.scratchLottery}
          onMouseUp={this.end}
        >
          对不起，你的浏览器不支持canvas，请升级
        </canvas>
      </div>
    )
  }
}