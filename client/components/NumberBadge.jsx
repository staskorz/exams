import React, { Component } from 'react'
import { Badge } from 'material-ui'


export default class NumberBadge extends Component {
	shouldComponentUpdate(nextProps) {
		const { content, primary, secondary, style } = this.props
		
		return content !== nextProps.content || primary !== nextProps.primary || secondary !== nextProps.secondary || style !== nextProps.style
	};
	
	
	render() {
		const { content, primary, secondary, style, badgeStyle } = this.props
		
		const props = {
			primary,
			secondary,
			style,
			badgeStyle,
		}
		
		return <Badge badgeContent={ content } { ...props } />
	}
}
