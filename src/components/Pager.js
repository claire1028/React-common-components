import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;

export default function Pager(props) {
  const s = props.onePageSize;

  const [list, setList] = useState([]);
  const [cnt, setCnt] = useState([]);
  let [pager, setPager] = useState(0);
  const firstRef = useRef(true);

  useEffect(()=> {
    props.getData({page: pager, size: s}).then((tc) => {
      if(firstRef.current) {
        const tp = [];
        for(let i=0; i<Math.ceil(tc.totalCount/s); i++) {
          tp.push(i);
        }
        setList(tp);
      }
      firstRef.current = false;
      setCnt(tc.data);
    });
  }, [pager]);

  const gotoPager = (p) => {
    
    if(pager === p || p < 0 || p >= list.length) {
      return;
    }
    setPager(p);
  };

  const gotoPrev = () => {
    const p = --pager;
    if(p < 0) {
      return;
    }
    setPager(p);
  };

  const gotoNext = () => {
    const p = ++pager;
    if(p >= list.length) {
      return;
    }
    setPager(p);
  };

  const jumpTo = (e) => {
    if (e.which === ENTER_KEY_CODE) {
      const page = Number(e.target.value);
      if(!isNaN(page)){
        gotoPager(page);
      }
		}
  }

  return(
    <div>
      {props.children(cnt)}
      <i className="icon-pager" onClick={gotoPrev}>&lt;</i>
      <ul>
        {
          list.map((e, i) => 
            <li 
              key={i} 
              onClick={() => gotoPager(e)}
              className={`page-item ${i===pager? 'active': ''}`}
            >
              {e}
            </li>
          )
        }
      </ul>
      <i className="icon-pager" onClick={gotoNext}>&gt;</i>
      <input 
        type="text"
        onKeyUp={jumpTo} 
        className="jump-page"
      />
    </div>
  )
}

Pager.propTypes = {
  onePageSize: PropTypes.number,
  getData: PropTypes.func,
}