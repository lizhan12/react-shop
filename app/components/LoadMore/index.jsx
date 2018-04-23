import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import "./style.less"
class LoadMore extends React.Component{
    constructor(props,context){
      super(props,context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      
   }
   render(){
      return(<div className="load-more" ref="wrapper">
                {
                    this.props.isHasMore
                    ? <span>加载中...</span>
                    : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                }
            </div>)
   }
   componentDidMount(){
      const loadMoreFn=this.props.loadMoreFn;
      const wapper = this.refs.wrapper
      console.log(wapper)
      let timeId

      function callback() {
         let top=wapper.getBoundingClientRect().top
         let heigth= window.screen.height
         if(top && top < heigth){
            loadMoreFn()
         }
      }

      window.addEventListener("scroll",function(){
         if(this.props.isHasMore){
            return 
         }
         if(timeId)clearTimeout(timeId);
         timeId=setTimeout(callback,50)
      }.bind(this),false)

   }
   loadMoreHandle(){
      const data=this.props.loadMoreFn();
      console.log(data)
   }
}

export default LoadMore;