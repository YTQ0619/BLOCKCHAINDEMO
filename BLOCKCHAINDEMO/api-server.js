const express = require('express');
const cors = require('cors');
const P2p = require('./P2p.js');
const Blockchain = require('./blockchain.js');

class ApiServer {
  constructor(blockchain, p2p) {
    this.app = express();
    this.blockchain = blockchain;
    this.p2p = p2p;
    this.server = null;
    
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  setupRoutes() {
    // 获取区块链数据
    this.app.get('/blocks', (req, res) => {
      try {
        res.json(this.blockchain.chain);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 获取节点信息
    this.app.get('/nodeinfo', (req, res) => {
      try {
        res.json({
          p2pPort: this.p2p.p2pPort || '未知',
          blockCount: this.blockchain.chain.length,
          peers: this.p2p.peers.length,
          difficulty: this.blockchain.difficulty
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 挖矿
    this.app.post('/mine', (req, res) => {
      try {
        const { data } = req.body;
        if (!data) {
          return res.status(400).json({ error: 'Data is required for mining' });
        }
        
        console.log('开始挖矿，数据:', data);
        const newBlock = this.blockchain.mine(data);
        console.log('挖矿完成，区块:', newBlock);
        this.p2p.broadcastLatestBlock();
        
        res.json({
          success: true,
          block: newBlock,
          message: 'Block mined successfully'
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 获取连接的节点信息
    this.app.get('/peers', (req, res) => {
      try {
        const peerInfo = this.p2p.peers.map(peer => ({
          address: peer.remoteAddress,
          port: peer.remotePort,
          localAddress: peer.localAddress,
          localPort: peer.localPort
        }));
        res.json(peerInfo);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 健康检查
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        timestamp: Date.now(),
        uptime: process.uptime()
      });
    });
  }

  start(port = 3001) {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(port, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`API Server running on http://localhost:${port}`);
          resolve(port);
        }
      });
    });
  }

  stop() {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          console.log('API Server stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

module.exports = ApiServer;