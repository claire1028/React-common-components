import React, {useRef} from 'react';
import PropTypes from 'prop-types';

export default function Dialog(props) {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const isModal = props.isModal;
  const noop = () => {};
  const ref = useRef(null);

  const close = (e) => {
    if(e.target === ref.current) {
      if(onClose) {
        onClose();
      } else {
        noop();
      }
    }
  }

  return (
    <div 
      className="dlg-wrapper" 
      ref={ref}
      style={{display: isOpen ? 'block': 'none'}}
      onClick={!isModal ? close : noop }
    >
      {React.Children.only(props.children)}
    </div>
  )
}

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isModal: PropTypes.bool
};