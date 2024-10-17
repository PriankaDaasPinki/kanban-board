import React, { useState } from "react";
// import { Button } from "react-bootstrap";
import { FaArrowCircleUp } from "react-icons/fa";
import styled from "styled-components";

// export const Heading = styled.h1`
//     text-align: center;
//     color: gray;
// `;

// export const Content = styled.div`
//     overflowy: scroll;
//     height: 2500px;
// `;

export const Button = styled.div`
    position: fixed;
    width: 100%;
    left: 95%;
    bottom: 50px;
    height: 15px;
    font-size: 2rem;
    z-index: 1;
    cursor: pointer;
    color: gray;
`;

export default function ScrollUpButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <Button>
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </Button>
  );
}
