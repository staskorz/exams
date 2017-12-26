import React from 'react'


export default ({ tags }) => <span>{ tags.map((tag, index) => <span key={ index }>&nbsp; { tag }</span>) }</span>
