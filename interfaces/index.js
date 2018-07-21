function Fetch(host) {
  this.fetch = async (url, auth, data={}, method='GET') => {
  	let response = await this._request(url, auth, data, method)	
  	if (response.data && response.data.code === 403) {
  	  // token 过期了，重新调用接口
  	  localStorage.removeItem('token');
  	  return this.fetch(url, auth, data, method)	
  	}
  	return response
  }
  
  this._request = async (url, auth, data, method) => {
    let headers = {}
  	if (auth) {
  	  headers['TEST-TOKEN'] = await this._getToken()
  	}
  	let res = await $.ajax({ url: url, data: data, headers: headers, method: method })
  	return res
  }
  
  this.login = async () => {
  	let token = 'test-token' 
  	localStorage.setItem('token',JSON.stringify(token))
  	return token
  }
  
  this._getToken = async () => {
  	let token = '';
  	token = JSON.parse(localStorage.getItem('token')) 	
  	if (!token) {
  	  token = await this.login()
  	}	
  	return token
  }
}



function fetch () {
   let host = 'www.baidu.com';
   let fetch = new Fetch(host)
   return fetch.fetch(...arguments)
}

async function getPhotos () {
   return await fetch('../static/mock/data.json', true,  'GET')
}

