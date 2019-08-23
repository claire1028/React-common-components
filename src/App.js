import React from 'react';
import {useState, useEffect} from 'react';
import Dialog from './components/Dialog';
import Tabs, {Tab} from './components/Tabs';
import Scroll from './components/Scroll';
import Pager from './components/Pager';
import Loading from './components/Loading';
import VideoPlayer from './components/VideoPlayer';

import but from './images/but.jpg';
import {getData} from './mockData';
import './App.css';


function App() {
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData([{name: 1},{name: 2}]);
  },[]);

  return (
   
    <div className="container">
      <section>
        <h3>Dialog</h3>
        <div>
          <button onClick={open}>open dialog </button>
        </div>
        <Dialog isOpen={isOpen} isModal={false} onClose={close}>
          <div className="con">this is a dialog</div>
        </Dialog>
      </section>
      
      <section>
        <h3>Tab</h3>
        <Tabs>
          <Tab title="tab1">
            {data.map((el, i) => 
              <div key={i}>{el.name}</div>
            )}
          </Tab>
          <Tab title="tab2">
            <div className="dd">2222</div>
            <div>2222</div>
          </Tab>
          <Tab title="tab3">
            <div>333</div>
            <div>333</div>
          </Tab>
        </Tabs>
      </section>
     
      <section>
        <h3>Pager</h3>
        <Pager getData={getData} onePageSize={5}>
          {
            data => (
            data.length > 0 &&
            data.map((v, index) => 
              <div className="item" key={index}>
                {v}
              </div>
            )
            )
          }
        </Pager>
      </section>
    
      
      <section>
        <Loading />
      </section>
      <section>
        <VideoPlayer src="https://s.dianrong.com/static/mp4/dianrong5zhounian.mp4" img={but} />
      </section>

      <section>
        <h3>Scroll</h3>
        <Scroll getData={getData} >
          {
            data => (
            data.length > 0 &&
            data.map((v, index) => 
              <div className="item" key={index}>
                {v}
              </div>
            )
            )
          }
        </Scroll>
      </section>
      
    </div>
  );
}

export default App;
