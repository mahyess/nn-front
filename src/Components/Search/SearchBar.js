import React, { Component } from "react"
import PropTypes from "prop-types"
import { Image, Search, Segment } from "semantic-ui-react"
import { getPost } from "src/actions/postActions"
import { connect } from "react-redux"
import { search } from "src/actions/searchActions"

import { Link } from "react-router-dom"

const categoryLayoutRenderer = ( { categoryContent, resultsContent } ) => (
   <div>
        <span style={ { width: "444px", textAlign: "center" } }>
          <h3
             className="name"
             style={ {
                backgroundColor: "azure",
                height: "25px",
                textTransform: "capitalize",
             } }
          >
            { categoryContent }
          </h3>
        </span>

      <div style={ { background: "#deddd9" } } className="results">
         { resultsContent }
      </div>
      <Link to={ `/search-results/` }>see more for { categoryContent }</Link>
   </div>
)

categoryLayoutRenderer.propTypes = {
   categoryContent: PropTypes.node,
   resultsContent: PropTypes.node,
}

const categoryRenderer = ( { name } ) => (
   <span
      style={ {
         height: "20px",
         fontSize: "16px",
         fontWeight: "bold",
      } }
   >
    { name }
  </span>
)

categoryRenderer.propTypes = {
   name: PropTypes.string,
}

const resultRenderer = ( {
   _id = null,
   title = null,
   body = null,
   username = null,
   name = null,
   full_name = null,
   description = null,
   icon = null,
   slug = null,
   profile = null,
} ) => (
   <Segment>
      { title && <h3>{ title }</h3> }
      { full_name && <Link to={ `/profile/${ username }` }>
         <h3>
            { full_name }
         </h3>
      </Link> }
      { name && <Link to={ "/samaj/" + _id + "/" + slug }>
         <h3>{ name }</h3>


         { body && <p>{ body.substring( 0, 150 ) } </p> }
         { description && <p>{ description }</p> }
      </Link> }
      { icon && <img

         alt=""
         src={ icon }
         style={ {
            width: "55px",
            height: "55px",
            float: "right",
            marginTop: "-59px",
            borderStyle: "solid",
            borderColor: "#e9f0ed",
         } }
      /> }
      { profile && <Image

         alt=""
         src={ profile.avatar }
         style={ {
            width: "50px",
            height: "50px",
            float: "right",
            marginTop: "-36px",
            objectFit: "cover",
            marginRight: -13,
            borderColor: "#e9f0ed",
            borderStyle: " solid",
         } }
      /> }

   </Segment>
)

class SearchBar
   extends Component {
   state = {
      searchKeyword: "",
   }

   onChange = ( e ) => {
      this.setState( { searchKeyword: e.target.value }, () =>
         this.props.search( this.state.searchKeyword ),
      )
   }


   handleResultSelect = ( e, { result } ) => {
      this.props.getPost( result.slug )
   }

   render() {
      return <Search
         category
         categoryLayoutRenderer={ categoryLayoutRenderer }
         categoryRenderer={ categoryRenderer }
         resultRenderer={ resultRenderer }
         onResultSelect={ this.handleResultSelect }
         onSubmit={ this.onSubmit }
         input={ {
            icon: "search",
            iconPosition: "right",
            placeholder: "Search Everything ...",
         } }
         onSearchChange={ this.onChange }
         noResultsMessage="Result not found"
         value={ this.state.searchKeyword }
         type="text"
         size="large"
         className="searchbox"
         aligned="left"
         style={ { padding: "3px 30px" } }
         // loading={isLoading}
         // onSearchChange={_.debounce(this.handleSearchChange, 500, {
         //   leading: true,
         // })}
         results={ this.props.searchResults }
         // value={value}
      />
   }
}

const mapStateToProps = ( state ) => ( {
   searchResults: state.search.results,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   getPost: ( slug ) => dispatch( getPost( slug ) ),
   search: ( searchKeyword ) => dispatch( search( searchKeyword ) ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( SearchBar )
