//

/*
import Alignment from '../styles/Alignment';

<View style={[Alignment.alignTopLeft, { flex: 1 }]}></View>
*/

import { ViewStyle } from 'react-native';

const Alignment: { [key: string]: ViewStyle } = {
  // Top Row
  alignTopLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  alignTopCenter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  alignTopRight: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  // Center Row (Vertically center)
  alignLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // Bottom Row
  alignBottomLeft: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  alignBottomCenter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  alignBottomRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
};

export default Alignment;
