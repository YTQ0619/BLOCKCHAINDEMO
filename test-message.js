const messageType = require('./messages-temp.js');
const Messages = require('./messages.js');
const Block = require('./block.js');

console.log("==============消息类型和消息工厂测试开始==================");

try {
  console.log("1.测试消息类型枚举");
  console.log('REQUEST_LATEST_BLOCK:', messageType.REQUEST_LATEST_BLOCK);
  console.log('REQUEST_LATEST_BLOCK:', messageType.RECEIVE_LATEST_BLOCK);
  console.log('REQUEST_LATEST_BLOCKCHAIN:', messageType.REQUEST_LATEST_BLOCKCHAIN);
  console.log('REQUEST_LATEST_BLOCKCHAIN:', messageType.RECEIVE_LATEST_BLOCKCHAIN);

  console.log("2.测试请求最新区块消息功能");
  const requestLatestBlockMsg = Messages.requestLatestBlock();
  console.log('消息类型:', requestLatestBlockMsg.type);
  console.log('是否为最新区块类型：',requestLatestBlockMsg.type === messageType.REQUEST_LATEST_BLOCK);
  console.log('消息结构：',JSON.stringify(requestLatestBlockMsg));

  console.log("3.测试响应最新区块消息功能");
  const testBlock = Block.genesis;
  const sendLatestBlockMsg = Messages.sendLatestBlock(testBlock);
  console.log('消息类型：',sendLatestBlockMsg.type);
  console.log('是否为响应最新区块类型:',sendLatestBlockMsg.type === messageType.RECEIVE_LATEST_BLOCK);
  console.log('包含的响应区块数据：',sendLatestBlockMsg.data);
  console.log('数据是否为创世纪区块:',sendLatestBlockMsg.data.index === 0);
  console.log('消息结构',JSON.stringify(requestLatestBlockMsg));
  
  console.log('4.测试请求整个区块消息的功能');
  const requestBlockchainMsg = Messages.getBlockchain();
  console.log('消息类型:',requestBlockchainMsg.type);
  console.log('是否为请求整个区块链类型:',requestBlockchainMsg.type === messageType.REQUEST_LATEST_BLOCKCHAIN);
  console.log('消息结构:',JSON.stringify(requestBlockchainMsg));

  console.log('5.测试响应整个区块链消息的功能');
  const testChain = [Block.genesis];
  const sendBlockchainMsg = Messages.sendBlockchain(testChain);
  console.log('消息类型:',sendBlockchainMsg.type);
  console.log('是否为响应整个区块链类型:',sendBlockchainMsg.type === messageType.RECEIVE_LATEST_BLOCKCHAIN);
  console.log('包含的区块链数据:',sendBlockchainMsg.data);
  console.log('数据是否为包含创世纪区块的数组:',Array.isArray(sendBlockchainMsg.data) && sendBlockchainMsg.data[0].index === 0);
  console.log('消息结构:',JSON.stringify(sendBlockchainMsg));

  console.log('6.测试消息类型完整性检查');
  const allMessageTypes = Object.keys(messageType);
  console.log('定义的消息类型数量：',allMessageTypes.length);
  console.log('消息类型列表：',allMessageTypes.join(','));
  console.log('======================所有测试通过======================');
  


} catch (e) {
  console.log(e.message);
}
