import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import "./style.less"

class HomeAd extends React.Component{
   constructor(props,context){
      super(props,context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
   }

   render(){
      return(<div id="home-ad">
         <h2>超值特惠</h2>
         <div className="ad-container clear-fix">
            {this.props.data.map((val,index) => {
               return <div key={index} className="ad-item float-left">
                            <a href={val.link} target="_blank">
                                <img src={val.img} alt={val.title}/>
                            </a>
                        </div>
            })}
         </div>
              

         </div>)
   }
   
}
export default HomeAd
