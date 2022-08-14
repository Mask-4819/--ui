import { createVNode, render } from 'vue';
import type { App } from 'vue';
import type { MessageType } from './messageProps';
import _Message from './message.vue';

let MessageList = [],
  VNode;
// seed = 1;
const Message: any = function (options) {
  console.log('hello');
  // let id = seed++;
  // options.id = id;
  // options.onClose = function () {
  //   Message.close(id);
  // };

  VNode = createVNode(_Message, {
    options
  });
  // VNode = createVNode(_Message);
  const MessageEl = document.createElement('div');
  render(VNode, MessageEl);
  document.body.appendChild(MessageEl);
  console.log(VNode);
  let offsetTop = options.offset || 20;
  MessageList.forEach((item) => {
    offsetTop += item.el.offsetTop + 20;
  });
  options.offset = offsetTop;
  MessageList.push(VNode);
};
['success', 'warning', 'type', 'error'].forEach((type) => {
  Message[type] = (options) => {
    return Message({
      type,
      message: options
    });
  };
});

Message.close = function (id) {
  let len = MessageList.length;
  let idx = -1;
  let removeHeight = 0;
  for (let i = 0; i < len; i++) {
    if (MessageList[i].id === id) {
      removeHeight = MessageList[i].el.offsetTop;
      idx = i;
      MessageList.splice(i, 1);
      break;
    }
  }
  if (idx === -1 || len <= 1 || idx > len - 1) return;
  for (let i = idx; i < len; i++) {
    let dom = MessageList[i].el;
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removeHeight - 20 + 'px';
  }
};

export default Message;
