import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';
import {getSearchData} from '../../../fetch/search/search';

const initialState={
	data:[],
	hasMore:false,
	isLoadingMore:false,
	page:0
}


class List extends React.Component{
    constructor(props,context){
      super(props,context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      this.state = initialState
      
   }
	render(){
		return(<div>

			{this.state.data.length?<ListComponent data={this.state.data} />:<div>'加载中........'</div>}
			{
				this.state.hasMore ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}  /> : ''
			}

			</div>)
	}

	componentDidMount() {
		console.log(1)
		//获取首页数据
		this.loadFirstPageData();
		
	}

	loadFirstPageData(){
	 	const cityName = this.props.userinfo.cityName
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(0, cityName, category, keyword)
        this.resultHandle(result)
	}

	//加载更多数据
	loadMoreData(){
		this.setState({
			isLoadingMore:true
		})
		const cityName = this.props.userinfo.cityName
        const page = this.state.page
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(page, cityName, category, keyword)
        this.resultHandle(result)

        // 更新状态
        this.setState({
            isLoadingMore: false
        })

	}
	//数据处理
	resultHandle(result){
		//增加数
		const page=this.state.page;
		this.setState({
			page:page+1
		})
		result.then(res=>{
			return res.json() ;
		}).then(json => {
			const hasMore= json.hasMore;
			const data = json.data;

			this.setState({
				data:this.state.data.concat(data),
				hasMore:hasMore
			})
		}).catch(e =>{
			if(__DEV__)console.error("搜索页面获得数据报错",e.message)
		})
	}

	componentDidUpdate(prevProps, prevState) {
		const keyword = this.props.keyword ;
		const category = this.props.category ; 
		if(keyword === prevProps.keyword && category === prevProps.category)return;
		this.setState(initialState);
		//重新加载数据
		this.loadFirstPageData();

	}
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(List);