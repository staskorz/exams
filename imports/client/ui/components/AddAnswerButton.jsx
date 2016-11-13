import React from 'react';
import { FlatButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';


export default ({ disabled, onClick }) => <FlatButton
		label={ <FormattedMessage id='add' /> }
		secondary={ true }
		disabled={ disabled }
		onClick={ onClick }
/>;
