import React from 'react';
import './index.css';

const prize = [['一等奖', '二等奖', '三等奖'], ['八等奖', 'Start', '四等奖'], ['七等奖', '六等奖', '五等奖']];
const indexMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 5,
  4: 8,
  5: 7,
  6: 6,
  7: 3
};

export default class SquareLottery extends React.Component {
  resRef = null;
  prizeEle = null;
  state = {
    disable: false
  };

  getRandomPrize() {
    const i = Math.floor(Math.random() * 8) + 16;
    console.log(i);
    let flag = 0;
    const len = this.prizeEle.length;
    const timer = setInterval(() => {
      for (let j = 0; j < len; j++) {
        if(j !== 4) {
          this.prizeEle[j].className = '';
        }
      }
      const f = flag % (len - 1);
      this.prizeEle[indexMap[f]].className = 'active';
      flag++;
      if (i === flag) {
        clearInterval(timer);
        const level = i % (len-1) === 0 ? 8 : i % (len-1);
        this.resRef.innerHTML = '恭喜您获得' + level + '等奖';
        this.setState({disable: false});
      }
    }, 100);
  }

  isStartBtn = (i, j) => {
    return i === 1 && j === 1;
  };

  start = (i, j) => {
    if (this.isStartBtn(i, j) && !this.state.disable) {
      this.setState({disable: true});
      this.getRandomPrize();
    }
    return;
  }

  componentDidMount() {
    this.prizeEle = document.getElementsByTagName('td');
  }

  render() {
    const {disable} = this.state;
    return (
      <div className="square">
        <table>
          {
            prize.map((v, i) =>
              <tr key={i}>
                {v.map((item, j) =>
                  <td
                    key={j}
                    onClick={() => { this.start(i, j) }}
                    className={` ${disable && this.isStartBtn(i, j) ? 'disable': ''} ${this.isStartBtn(i, j) ? 'start' : ''}`}
                  >
                    {item}
                  </td>
                )}
              </tr>
            )
          }
        </table>
        <div className="result" ref={ref => this.resRef = ref} />
      </div>
    )
  }
}