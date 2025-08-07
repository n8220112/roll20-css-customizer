import React from "react";
import {TbBrandTwitterFilled} from "react-icons/tb";
import {TbFileInfo} from "react-icons/tb";

const Contact = () => {
  return (
    <aside className="contact">
      <a href="https://x.com/yanoquedanrosas" rel="noreferrer" target="_blank">
        <TbBrandTwitterFilled />
      </a>
      <a href="#none">
        <TbFileInfo />
      </a>
      <span>ⓒ 2025. @yanoquedanrosas All rights reserved.</span>
    </aside>
  );
};

export default Contact;
