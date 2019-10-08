import React from 'react';
import './app.css';

const data = ['未中奖', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖'];
const lightArr = new Array(12).fill(0);
const bgArr = new Array(6).fill(0);

export default class Lottery extends React.Component {
  state = {
    rotateStyle: {
      transform: 'rotate(0deg)'
    }
  };
  startDeg = 0;

  start = () => {
    const r = Math.floor(Math.random() * (data.length)); // or fetch from API to get which prize
    this.startDeg = this.startDeg - this.startDeg % 360 +  5 * 360 + (360 - 60 * r);
    this.setState({
      rotateStyle: {
        transform: `rotate(${this.startDeg}deg)`
      }
    });
  };


  render() {
    return (
      <div className="lottery-wrapper">
        <div className="bg" style={this.state.rotateStyle}>
          <ul className={`background`}>
            {
              bgArr.map((v, i) =>
                <li key={i} />
              )}
          </ul>
          <ul className="gifts">
            {
              data.map((v, i) =>
                <li key={i}>
                  {v}
                </li>
              )}
          </ul>
        </div>
        <div className="pointer" onClick={this.start}>
          <i>抽奖</i>
          <ul>
            {lightArr.map((v, i) =>
              <li />
            )}
          </ul>
        </div>
      </div>
    )
  }
}