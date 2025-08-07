import {useRef, useState} from "react";
import {Overlay, Tooltip} from "react-bootstrap";
import {BsQuestionCircle} from "react-icons/bs";

const TooltipButton = ({content}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const timeoutRef = useRef(null); //이전 타이머를 저장하기 위한 ref

  const handleClick = () => {
    //클릭할 때마다 기존 타이머를 초기화한 후 다시 타이머를 설정
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShow(true);
    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <>
      <button ref={target} onClick={handleClick} className="tooltip-button">
        <BsQuestionCircle />
      </button>
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip {...props}>
            <span dangerouslySetInnerHTML={{__html: content}} />
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default TooltipButton;
