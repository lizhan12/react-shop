export default{
	getItem:function(key){
		let value;
		try{
			value=localStorage.getItem(key)
		}catch(e){
			if(__DEV__){
				console.error("localStorage.getItem",e.message)
			}
		}finally{
			return value;
		}
	},
	setItem:function(key,value){
		try{
			//ios safari 无痕模式下,直接使用localStorage会报错
			localStorage.setItem(key,value)
		}catch(ex){
			if(__DEV__){
				console.error("localStorage.setItem",ex.message)
			}
		}
	}
}