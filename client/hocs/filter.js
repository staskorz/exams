import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import Filter from '../components/Filter'


const emptyArray = []


export default ({ prop, func }) => WrappedComponent => class Filtered extends Component {
	state = {
		filterValue: '',
		filteredList: emptyArray,
	}
	
	
	onFilterChange = value => {
		this.setState({
			filterValue: value,
		})
		
		this.debouncedUpdateState(this.props, value)
	}
	
	
	updateState = (props, filterValue) => {
		if(props.loading) {
			this.setState({
				filteredList: emptyArray,
			})
		} else {
			this.setState({
				filteredList: this.filter(props[prop], filterValue),
			})
		}
	}
	
	
	debouncedUpdateState = debounce(this.updateState, 300)
	
	
	filter = (unfiltered, value) => {
		const trimmedFilterValue = value.trim()
		
		if(trimmedFilterValue) {
			return func(unfiltered, trimmedFilterValue)
		} else {
			return unfiltered
		}
	}
	
	
	componentWillMount() {
		this.updateState(this.props, '')
	}
	
	
	componentWillReceiveProps(nextProps) {
		this.updateState(nextProps, this.state.filterValue)
	}
	
	
	render() {
		const { filterValue, filteredList } = this.state
		
		const { ...newProps } = this.props
		
		newProps[prop] = filteredList
		
		return <div>
			<Filter value={ filterValue } onChange={ this.onFilterChange } />
			
			<WrappedComponent { ...newProps } />
		</div>
	}
}
