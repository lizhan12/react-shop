import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'

import "./style.less"
// require "./style.less";


class Header extends React.Component{
   constructor(props,context){
      super(props,context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
   }

   render(){
      return(
             <div id="common-header">
             <span className="back-icon" onClick={this.handleClick}>
              <i className="icon-chevron-left"></i>
             </span>
                <h1 className="icon-chrevron-left">{this.props.title}</h1> 
            </div>
      )
   }

   handleClick () {
    window.history.back();
   }
}

export default Header ;