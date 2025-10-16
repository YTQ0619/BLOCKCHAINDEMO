const Block = require('./Block.js');
const Blockchain = require('./Blockchain.js');

console.log("======区块链测试开始======");
try {
  console.log("1.测试创世区块：");

  const genesis = Block.genesis;

  console.log("---索引：", genesis.index);
  console.log("---数据：", genesis.data);
  console.log("---哈希：", genesis.hash);
  console.log("---前一块哈希：", genesis.previousHash);
  console.log("---nonce：", genesis.nonce);
  console.log("测试成功");
    
  console.log("2.测试初始化区块链");
  const blockchain = new Blockchain();
  console.log("---区块链长度：", blockchain.get().length);
  console.log("---最新的区块索引：", blockchain.latestBlock.index);
  console.log("---挖矿难度:",blockchain.difficulty);
  console.log("测试成功");

























  .3za
  .a
  
  
  
  
  
}catch(error){
  console.log("测试失败，错误信息：", error.message);
}
