import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {debounce} from '../util';

export default function Scroll(props) {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);
  const param = useRef({
    page: 0,
    size: 10
  });

  useEffect(() => {
    props.getData(param.current).then((tc) => {
      setTotalCount(tc.totalCount);
      setCount(tc.data.length);
      setData(tc.data);
    });
    param.current.page++;
  }, []);

  const scrollDebunc = debounce(() => {
    if(window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
      if(count < totalCount) { 
        props.getData(param.current).then((tc) => {
          const curCount = count + tc.data.length;
          setCount(curCount);
          setData(data.concat(tc.data));
        });
        param.current.page++;
      }
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', scrollDebunc, false);
    return () => {
      window.removeEventListener('scroll', scrollDebunc, false);
    };
  });

  return (
    <div>
      {props.children(data)}
      {count >= totalCount ? '没有更多了': '上拉加载更多'}
    </div>
  )
};

Scroll.propTypes = {
  getData: PropTypes.func,
};