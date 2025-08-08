import {useState} from "react";

import CustomizerPanel from "./components/CustomizerPanel";
import TextInputPanel from "./components/TextInputPanel";
import PreviewPanel from "./components/PreviewPanel";
import Contact from "./components/Contact";

import "./styles/style.scss";

function App() {
  const [userText, setUserText] = useState("");
  const [styleState, setStyleState] = useState({
    fontSize: "",
    letterSpacing: "",
    textAlign: "",
    fontWeight: "",
    fontStyle: "",
    textDecoration: [""],
    color: "",
    backgroundColor: "",
    backgroundImage: "",
    textShadow: {
      x: "",
      y: "",
      blur: "",
      color: "",
    },
    boxShadow: {
      x: "",
      y: "",
      blur: "",
      color: "",
    },
    display: "",
    width: "",
    height: "",
    padding: {
      top: "",
      right: "",
      bottom: "",
      left: "",
    },
    margin: {
      top: "",
      right: "",
      bottom: "",
      left: "",
    },
    border: {
      width: {top: "", right: "", bottom: "", left: ""},
      style: "",
      color: "",
    },
    borderRadius: {
      top: "",
      right: "",
      bottom: "",
      left: "",
    },
  });
  return (
    <div className="wrap">
      <main className="main-container">
        <CustomizerPanel styleState={styleState} setStyleState={setStyleState} userText={userText} />
        <TextInputPanel userText={userText} setUserText={setUserText} />
        <PreviewPanel styleState={styleState} setStyleState={setStyleState} userText={userText} setUserText={setUserText} />
      </main>
      <Contact />
    </div>
  );
}

export default App;
