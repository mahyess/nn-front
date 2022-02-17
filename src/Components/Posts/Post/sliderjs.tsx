var slides
export var nextSlide
export var prevSlide
export var totalSlides
export var index

export function load( pid, cindex ) {
   pid = "pi" + pid
   slides = document.getElementById( pid ).children
   prevSlide = document.getElementById( "left-slide" + pid )
   nextSlide = document.getElementById( "right-slide" + pid )

   totalSlides = slides.length
   index = cindex
   for ( var i = 0; i < slides.length; i++ ) {
      slides[i].classList.remove( "active" )
   }
   slides[index].classList.add( "active" )
}

export function next( direction ) {
   if ( direction === "next" ) {
      index++
      if ( index === totalSlides ) {
         index = 0
      }
   } else {
      if ( index === 0 ) {
         index = totalSlides - 1
      } else {
         index--
      }
   }

   for ( var i = 0; i < slides.length; i++ ) {
      slides[i].classList.remove( "active" )
   }
   slides[index].classList.add( "active" )

   return index
}
