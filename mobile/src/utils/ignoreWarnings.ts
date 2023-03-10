/**
 * Ignore some yellowbox warnings.
 */

import { LogBox } from 'react-native';

// prettier-ignore
LogBox.ignoreLogs([
  "Require cycle:",
  "Warning:"
])

LogBox.ignoreAllLogs();
