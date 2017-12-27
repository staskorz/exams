import React from 'react'
import { Chip } from 'material-ui'


export default ({ tags }) => <span>{ tags.map((tag, index) => <Chip key={ index }>{ tag }</Chip>) }</span>
