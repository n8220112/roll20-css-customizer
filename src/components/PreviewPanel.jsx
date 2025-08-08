import React from "react";
import {useState} from "react";
import {Container, Form} from "react-bootstrap";

const PreviewPanel = ({styleState, userText}) => {
  // console.log("스타일 잘 오는지 확인", styleState);

  // a태그 이벤트 제거
  function handleClick(e) {
    e.preventDefault();
  }

  // spacer 토글
  const [spacerOn, setSpacerOn] = useState(true);

  // margin shorthand 옵션
  const isAllAuto = styleState.margin.top === "auto" && styleState.margin.right === "auto" && styleState.margin.bottom === "auto" && styleState.margin.left === "auto";

  function allTextShadowFilled(shadow) {
    return shadow?.x && shadow?.y && shadow?.blur && shadow?.color;
  }

  function allBoxShadowFilled(shadow) {
    return shadow?.x && shadow?.y && shadow?.blur && shadow?.color;
  }

  const hasBorderWidth = styleState.border.width.top || styleState.border.width.right || styleState.border.width.bottom || styleState.border.width.left;

  const {border, ...styleStateWithoutBorder} = styleState;

  const borderRadiusFilled = styleState.borderRadius.top || styleState.borderRadius.right || styleState.borderRadius.bottom || styleState.borderRadius.left;

  const isPaddingSet = Object.values(styleState.padding).some((val) => val !== "");
  const isMarginSet = Object.values(styleState.margin).some((val) => val !== "");
  const isTextDecorationSet = Object.values(styleState.textDecoration).some((val) => val !== "");

  const computedStyle = {
    ...styleStateWithoutBorder,

    ...(isPaddingSet
      ? {
          padding: `${styleState.padding.top || 0}px ${styleState.padding.right || 0}px ${styleState.padding.bottom || 0}px ${styleState.padding.left || 0}px`,
        }
      : {
          padding: "",
        }),

    ...(isMarginSet
      ? {
          margin: isAllAuto ? "auto" : `${styleState.margin.top || 0}px ${styleState.margin.right || 0}px ${styleState.margin.bottom || 0}px ${styleState.margin.left || 0}px`,
        }
      : {
          margin: "",
        }),

    ...(hasBorderWidth
      ? {
          borderWidth: `${border.width.top || 0}px ${border.width.right || 0}px ${border.width.bottom || 0}px ${border.width.left || 0}px`,
          borderStyle: border.style || "none",
          borderColor: border.color || "transparent",
        }
      : {}),

    textDecoration: Array.isArray(styleState.textDecoration) ? styleState.textDecoration.join(" ") : styleState.textDecoration || "",

    textShadow: allTextShadowFilled(styleState.textShadow) ? `${styleState.textShadow.x}px ${styleState.textShadow.y}px ${styleState.textShadow.blur}px ${styleState.textShadow.color}` : "",

    boxShadow: allBoxShadowFilled(styleState.boxShadow) ? `${styleState.boxShadow.x}px ${styleState.boxShadow.y}px ${styleState.boxShadow.blur}px ${styleState.boxShadow.color}` : "",

    ...(borderRadiusFilled
      ? {
          borderRadius: `${styleState.borderRadius.top || 0}px ${styleState.borderRadius.right || 0}px ${styleState.borderRadius.bottom || 0}px ${styleState.borderRadius.left || 0}px`,
        }
      : {}),
  };

  /* 마크다운 */
  function parseMarkdownToHTML(input) {
    if (!input) return "";

    // ***중첩 태그*** 먼저
    let parsed = input.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");

    // **강조**
    parsed = parsed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // *이탤릭*
    parsed = parsed.replace(/\*(.+?)\*/g, "<em>$1</em>");

    return parsed;
  }

  return (
    <Container className="card-container preview-panel">
      <Form.Check id="hideSpacer" label="spacer 숨기기" onChange={() => setSpacerOn(!spacerOn)} />
      <div className="inner">
        <div className="message">
          {spacerOn ? <div className="spacer"></div> : ""}
          <span style={{display: "none"}}>2050년에 시작되는 아대물CP 젠싲 파이팅</span>
          <a
            className={isTextDecorationSet ? "default" : ""}
            href="https://zensiz.ivyro.net/"
            onClick={handleClick}
            style={computedStyle}
            dangerouslySetInnerHTML={{
              __html: userText === "" ? "여기에 미리보기가 나타납니다" : parseMarkdownToHTML(userText),
            }}
          />
        </div>
        {spacerOn ? (
          <div className="message">
            <div className="spacer"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};

export default PreviewPanel;
