// 内部协议
// kapok://${userName}@${userId}/${action}?${queryParameters}#${describe}
const _protocol = 'kapok';
class Protocol {
  uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  /**
   * [通过参数名，获取url中的参数值]
   * 示例URL:kapok://${userName}@${userId}/${action}?${queryParameters}#${describe}
   * @param  {[string]} queryName [参数名]
   * @return {[string]}           [参数值]
   */
  getQueryValue(queryName: string) {
    const reg = new RegExp(`(^|&)${queryName}=([^&]*)(&|$)`, 'i'),
      r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return null;
  }

  run() {
    return `${this.uri} is running`;
  }
}
const snake = new Protocol('lily');

console.log(snake.run());

const http = new Protocol('ss');
export default http;
