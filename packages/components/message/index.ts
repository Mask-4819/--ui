import type { App } from 'vue';
import { withInstall } from '../../src/util/install';
import Message from './src/message';
// console.log(Message);

Message.install = function (app: App): void {
  app.config.globalProperties.$message = Message;
};
// console.log(_Message);
// const Message = withInstall(_Message);
export default Message;
