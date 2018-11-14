
import deviceInfo from 'react-native-device-info';

const device = {};
device.DeviceID = deviceInfo.getUniqueID();
device.UserAgent = deviceInfo.getUserAgent();
device.DeviceBrand = deviceInfo.getBrand();
device.DeviceModel = deviceInfo.getModel();
device.SystemVersion = deviceInfo.getSystemVersion();
device.AppVersion = deviceInfo.getVersion();
device.AppReadableVersion = deviceInfo.getReadableVersion();
device.apiLevel = device.DeviceBrand.indexOf('Apple')  > 0 ? 'iPhone':'android'

export default device