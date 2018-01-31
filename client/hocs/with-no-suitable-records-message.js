import { branch, renderComponent } from 'recompose'
import NoSuitableRecords from '../components/NoSuitableRecords'


export default arrayField => branch(props => !props[arrayField].length, renderComponent(NoSuitableRecords))
