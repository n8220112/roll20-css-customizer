import React from "react";
import {Container, Row, Col} from "react-bootstrap";

import ResetControl from "./controllers/ResetControl";
import FontSizeControl from "./controllers/FontSizeControl";
import LetterSpacingControl from "./controllers/LetterSpacingControl";
import TextAlignControl from "./controllers/TextAlignControl";
import TextStyleControl from "./controllers/TextStyleControl";
import ColorControl from "./controllers/ColorControl";
import BackgroundColorControl from "./controllers/BackgroundColorControl";
import TextShadowControl from "./controllers/TextShadowControl";
import BoxShadowControl from "./controllers/BoxShadowControl";
import DisplayControl from "./controllers/DisplayControl";
import WidthHeightControl from "./controllers/WidthHeightControl";
import PaddingControl from "./controllers/PaddingControl";
import MarginControl from "./controllers/MarginControl";
import BorderControl from "./controllers/BorderControl";
import BorderRadiusControl from "./controllers/BorderRadiusControl";

import TooltipButton from "./controllers/inputs/TooltipButton";
import CustomizerButtonWrap from "./CustomizerButtonWrap.jsx";

const CustomizerPanel = ({styleState, setStyleState, userText}) => {
  const controlList = [
    {
      label: "기본 설정 리셋",
      key: "resetStyle",
      component: <ResetControl textDecoration={styleState.textDecoration} color={styleState.color} display={styleState.display} styleState={styleState} setStyleState={setStyleState} />,
      type: "switch",
      tooltip: true,
      tooltipDesc: "마우스오버 시의 밑줄 제거, 핑크 색상 제거, desc의 기본 이탤릭 제거, 디스플레이 inline-block 옵션입니다.",
    },
    {
      label: "폰트 크기",
      key: "fontSize",
      component: <FontSizeControl fontSize={styleState.fontSize} setStyleState={setStyleState} />,
      tooltip: true,
      tooltipDesc: "빈칸으로 둘 경우 롤20 기본 크기로 보입니다.",
    },
    {
      label: "글자 간격",
      key: "letterSpacing",
      component: <LetterSpacingControl letterSpacing={styleState.letterSpacing} setStyleState={setStyleState} />,
      tooltip: true,
      tooltipDesc: "좁히고 싶다면 마이너스 값을 입력하세요.",
    },
    {
      label: "정렬",
      key: "textAlign",
      component: <TextAlignControl textAlign={styleState.textAlign} setStyleState={setStyleState} />,
      tooltip: false,
      tooltipDesc: "",
    },
    {
      label: "텍스트 스타일",
      key: "textStyleGroup",
      component: <TextStyleControl fontWeight={styleState.fontWeight} fontStyle={styleState.fontStyle} textDecoration={styleState.textDecoration} setStyleState={setStyleState} />, // bold/italic/underline 등
      tooltip: true,
      tooltipDesc: "중첩 가능합니다.<br><strong>**볼드**와 <i>*이탤릭*</i>의 경우, <em>desc 아닌 일반 채팅</em>에 사용하고 싶을 시 <em>*로 쓰는 마크다운 문법</em>으로 적용하셔야 합니다.</strong>",
    },
    {
      label: "글자 색상",
      key: "color",
      component: <ColorControl color={styleState.color} setStyleState={setStyleState} />,
      tooltip: true,
      tooltipDesc: "#404040이 롤20 기본 색상입니다.",
    },
    {
      label: "디스플레이",
      key: "display",
      component: <DisplayControl display={styleState.display} setStyleState={setStyleState} />,
      tooltip: true,
      tooltipDesc: "inline-block은 너비 높이 지정 가능, block은 거기에 더해 여러 개 쌓으면 줄바꿈도 가능!",
    },
  ];
  return (
    <>
      <Container className="card-container customizer-panel">
        <Row>
          <Col xs={12}>
            <h2>Customize</h2>
          </Col>
          {controlList.map((item, index) => (
            <React.Fragment key={index}>
              <Col xs={12}>
                <div className="info">
                  {item.label}
                  {item.tooltip && <TooltipButton content={item.tooltipDesc} />}
                </div>
                <div className="control">{item.component}</div>
              </Col>
              {index === controlList.length - 2 && (
                <>
                  <BackgroundColorControl backgroundColor={styleState.backgroundColor} backgroundImage={styleState.backgroundImage} styleState={styleState} setStyleState={setStyleState} />
                  <TextShadowControl textShadow={styleState.textShadow} setStyleState={setStyleState} />
                  <BoxShadowControl boxShadow={styleState.boxShadow} setStyleState={setStyleState} />
                </>
              )}
            </React.Fragment>
          ))}
          <WidthHeightControl width={styleState.width} height={styleState.height} setStyleState={setStyleState} />
          <PaddingControl padding={styleState.padding} setStyleState={setStyleState} />
          <MarginControl margin={styleState.margin} setStyleState={setStyleState} />
          <BorderControl border={styleState.border} setStyleState={setStyleState} />
          <BorderRadiusControl borderRadius={styleState.borderRadius} setStyleState={setStyleState} />
        </Row>
        <CustomizerButtonWrap setStyleState={setStyleState} styleState={styleState} userText={userText} />
      </Container>
    </>
  );
};

export default CustomizerPanel;
