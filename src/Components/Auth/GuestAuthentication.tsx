import React, { Component } from "react"
import AuthNavbar from "../Layout/Navbar/AuthNavbar"

export default function (ComposedComponent: React.ComponentClass<any>) {
   interface Props {
      history: any
   }
   interface State {
      valid: boolean
   }

   class GuestAuthentication
      extends Component<Props, State> {
      constructor(props: Props) {
         super(props)
         this.state = {
            valid: true,
         }
      }

      componentDidMount() {

         const token = localStorage.getItem("token")
         if (token) {

            this.setState(
               {
                  valid: false,
               },
               () => this.props.history.push("/chautari/"),
            )
         } else {
            // this.props.history.push("/");
         }
      }

      render() {
         return (
            <React.Fragment>
               <AuthNavbar />
               {this.state.valid && <ComposedComponent {...this.props} />}
            </React.Fragment>
         )
      }
   }

   return GuestAuthentication
}
