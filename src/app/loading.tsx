import * as React from 'react';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';

export const Loading = () => (
  <Segment>
    <Dimmer active><Loader size='large'>Carregando...</Loader></Dimmer>
    <div style={{ height: '100%' }}></div>
  </Segment>
);
