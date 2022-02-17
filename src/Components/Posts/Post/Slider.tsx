import React, { Component } from "react"
import "../../../static/slider1.css"

import { load, next, prevSlide } from "./sliderjs"

class Slider
   extends Component {
   componentDidMount() {
      load()
   }

   render() {
      const postImages = []
      return (
         <div className="slider">
            <div className="slider-items">
               { postImages.map( ( item, index ) => (
                  <div key={ item } className="item">
                     <img src={ item }/>
                     <div className="caption">
                        { index + 1 } / { postImages.length }
                     </div>
                  </div>
               ) ) }
            </div>

            <div
               className="left-slide"
               onClick={ () => {
                  next( "prev" )
                  //imgIndex === 0 ? prevSlide.setAttribute('style', 'display: none') : null
               } }
            >
               { "<" }
            </div>
            <div
               className="right-slide"
               onClick={ () => {
                  next( "next" )
                  prevSlide.removeAttribute( "style" )
               } }
            >
               { ">" }
            </div>
         </div>
      )
   }
}

export default Slider
