import ReactDom from 'react-dom'


/* global document:false */
const renderTarget = document.getElementById('react-root')


export default Component => {
	ReactDom.render(Component, renderTarget)
}
