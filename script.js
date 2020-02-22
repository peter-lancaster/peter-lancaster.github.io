/*PETE - IN ORDER TO GET THIS WORKING ON CODEPEN, FOLLOWING TRANSFER FROM SCRIMBA COURSE
React Meme Generator Capstone Project https://scrimba.com/p/p7P5Hd/c6K77umimpor 
THE FOLLOWING CHANGES WERE REQUIRED:

1) Most of the changes are related to "accessing the React Libraries in codepen" vs
"accessing the React Libraries in scrimba"

In scrimba: ----------------------------------------------------------------

i) We have the dependencies in the left hand column as follows:
react@16.10.1
react-dom@16.10.1

ii) Each individual component has it's own file, and at the top of each file we have 
one or both of the following, as required (not required at all in codepen).

import React from "react" OR import React, {Component} from "react" 
import ReactDOM from "react-dom"

---------------------------------------------------------------------------

In codepen: ----------------------------------------------------------------

i) The following external scripts must be included: 

https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0/umd/react.production.min.js
https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0/umd/react-dom.production.min.js

(I don't know why cloudflare, but these are essentially the codepen version 
of the inclusion of the React libraries)

ii) Javascript preprocessor must be set to "Babel" 

iii) In codepen, it was necessary to replace "class MemeGenerator extends React" with 
"class MemeGenerator extends React.Component". However, this is related to React
syntax rather than codepen specific: 

"import React, {Component} from "react"" GOES WITH "class MemeGenerator extends React"
"import React from "react"" GOES WITH "class MemeGenerator extends React.Component"

---------------------------------------------------------------------------

2) "ReactDOM.render(<App />, document.getElementById("root"))" MUST appear after the
"parent" App React components that it references AND all the child React components that 
the App component references (Header and MemeGenerator in the example below).

*/

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "https://i.imgflip.com/we0ps.jpg",
      allMemeImgs: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes").
    then(response => response.json()).
    then(response => {
      const { memes } = response.data;
      this.setState({ allMemeImgs: memes });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    //Pete you were failing in your attempts here because you didn't include 
    //event.preventDefault(), and therefore the page was re-rendering every time
    //as a result of the onSubmit.

    event.preventDefault();
    let randomNum = Math.round(Math.random() * 99);
    this.setState({ randomImg: this.state.allMemeImgs[randomNum].url });

  }


  render() {
    return (
      React.createElement("div", null,
      React.createElement("form", { onSubmit: this.handleSubmit, className: "meme-form" },
      React.createElement("input", {
        type: "text",
        name: "topText",
        placeholder: "Top Text",
        value: this.state.topText,
        onChange: this.handleChange }),

      React.createElement("input", {
        type: "text",
        name: "bottomText",
        placeholder: "Bottom Text",
        value: this.state.bottomText,
        onChange: this.handleChange }),


      React.createElement("button", null, "Gen")),

      React.createElement("div", { className: "meme" },











      React.createElement("img", { src: this.state.randomImg, duration: 5000, timingFunction: "ease-out", alt: "" }),
      React.createElement("h2", { className: "top" }, this.state.topText),
      React.createElement("h2", { className: "bottom" }, this.state.bottomText))));



  }}


function Header() {
  return (
    React.createElement("header", null,
    React.createElement("img", {
      src: "http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png",
      alt: "Problem?" }),

    React.createElement("p", null, "Meme Generator")));


}

function App() {
  return (
    React.createElement("div", null,
    React.createElement(Header, null),
    React.createElement(MemeGenerator, null)));


}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));