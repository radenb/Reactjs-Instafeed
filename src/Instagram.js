import React from 'react'
import { fetchData } from '../Actions'

export default class InstaFeed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			igSent: false,
			client_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			oAuth: 'xxxxxxxxx.xxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			baseURL: 'https://api.instagram.com/v1'
		}
	}
	setSelfURL() {
		const location = '/users/self/media/recent/?access_token='
		let url = this.state.baseURL + location + this.state.oAuth + '&callback=myJsonpCallback'
		console.log(url)
		this.setState((prevState, props) => {
			return {url: url};
		});
	}
	stateUpdate( fetchedData ) {
		this.setState((prevState, props) => {
			return {
				igData: fetchedData.data,
				igSent: true,
				client_id: null,
				oAuth: null,
				baseURL: null,
				url: null
			};
		});
	}
	igMount() {
		let fetchedData = fetchData(this.state.url, this.stateUpdate.bind(this))
	}
	componentDidMount() {
		this.setSelfURL()
	}
	componentDidUpdate(prevProps, prevState) {
		this.state.igSent ? null : this.igMount();
	}
	render() {
		return (
			<div id="instaFeed" className="container" >
				{this.igData}
				{ this.state.igSent ? 
					this.state.igData.map( ( post ) => 
						<img src={post.images.thumbnail.url} key={post.id} />
					) : null 
		 		}
				{this.props.children}
			</div>
		)
	}
}