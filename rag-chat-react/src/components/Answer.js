import React from "react";
import Typewriter from "react-ts-typewriter";

const Answer = ({ text }) => {
  //   setQueryAnswer(text);
  console.log("Answer: " + text);
  const textRender = [text];
  const index = 0;
  const textArray = ["", text];
  return (
    <>
      <h1>{text}</h1>
      {/* <TypeAnimation
        sequence={["text", 2000, "Ready to help you!", 2000, text]}
        wrapper="span"
        cursor={true}
        // repeat={Infinity}
        style={{ fontSize: "2em", display: "inline-block" }}
      /> */}
      {/* <Typist key={index}>{textRender[index]}</Typist> */}
      {/* <TypingAnimator
        textArray={textArray}
        cursorColor="#333"
        textColor="#555"
        fontSize="24px"
        loop={false}
        typingSpeed={60}
        delaySpeed={2000}
        backspace
        height="60px"
      /> */}
      <Typewriter text={textArray} />
    </>
  );
};

export default Answer;
{
  /* <TypeAnimation
        sequence={[
          "", // Types 'One'
          1000, // Waits 1s
          queryAnswer, // Deletes 'One' and types 'Two'
          () => {
            console.log("Sequence completed");
          },
        ]}
        wrapper="span"
        cursor={true}
        // repeat={Infinity}
        style={{ fontSize: "2em", display: "inline-block" }}
      /> */
}
