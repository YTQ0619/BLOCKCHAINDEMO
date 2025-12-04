<template>
  <div class="blockchain-container">
    <div class="header">
      <h1>Blockchain Visualization</h1>
      <div class="header-right">
        <div class="node-info">
          <span class="label">当前节点：</span>
          <span class="current-node">P2P未知</span>
        </div>
        <div class="status">
          <span :class="['status-dot', connected ? 'online' : 'offline']"></span>
          {{ connected ? '已连接' : '未连接' }}
        </div>
      </div>
    </div>

    <div class="node-selector-bar">
      <div class="selector-left">
        <span class="label">可用节点</span>
        <button
          v-for="(node, index) in availableNodes"
          :key="node.airPort"
          @click="switchToNode(node)"
          :class="['node-btn',{active:currentApiPort === node.airPort}]"
          :title="`api端口: ${node.airPort},区块数: ${node.blockCount}`"
        >
          <div class="node-id">节点{{ index + 1 }}</div>
          <div class="node-blocks">{{ node.blockCount }}区块</div>
        </button>
        <div v-if="availableNodes.length === 0 && !isDiscovering" class="no-nodes">未发现节点</div>
        <div v-if="isDiscovering" class="discovering">扫描中...</div>
      </div>
      <button @click="discoverNodes" class="refresh-nodes-btn" :disabled="isDiscovering">刷新节点</button>
    </div>
    <div class="controls">
      <button @click="fetchBlock" class="refresh-btn">
        Refresh Chain
      </button>
      <div class="auto-refresh">
        <label>
          <input type="checkbox" v-model="autoRefresh" />
          Auto Refresh(2s)
        </label>
      </div>
    </div>
    <div class="chain-display" v-if=""></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const connected = ref(false)
const availableNodes = ref([])
const currentApiPort = ref(3001)
const block = ref([])
const autoRefresh = ref(true)
const isDiscovering = ref(false)
let timer = null

// 切换到指定节点
const switchToNode = (node) => {
  currentApiPort.value = node.airPort
  console.log(`切换到节点: ${node.airPort}`)
  // 这里可以添加连接逻辑
}

// 发现节点
const discoverNodes = async () => {
  isDiscovering.value = true
  try {
    // 模拟API调用发现节点
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 模拟发现的节点数据
    availableNodes.value = [
      { airPort: 3001, blockCount: 5 },
      { airPort: 3002, blockCount: 3 },
      { airPort: 3003, blockCount: 7 }
    ]
    connected.value = true
  } catch (error) {
    console.error('发现节点失败:', error)
  } finally {
    isDiscovering.value = false
  }
}

// 组件挂载时自动发现节点
onMounted(() => {
  discoverNodes()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
<style scoped>
.blockchain-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
}

.node-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.node-info .label {
  font-size: 13px;
  color: #666;
}

.current-node {
  font-weight: 600;
  color: #667eea;
  font-family: 'Roboto', sans-serif;
}

.status {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: #ccc;
}

.status-dot.online {
  background-color: #42b983;
  box-shadow: 0 0 8px rgba(66, 185, 131, 0.5);
}

.status-dot.offline {
  background-color: #e74c3c;
}

.node-selector-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #fefefe;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #1e1e2d;
  border-radius: 8px;
  flex-wrap: wrap;
  
}
.selector-left {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.selector-left-label {
  color: #8b949e;
  font-size: 14px;
}
.node-btn {
  padding: 8px 15px;
  background: #1e1e2d;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e6edff;
}
.node-btn:hover {
  background: #2d3748;
  box-shadow: 0 12px 20px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}
.node-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #1e1e2d 100%);
  border-color: #667eea;
  color: #fff;
  box-shadow: 0 15px 20px rgba(102, 126, 234, 0.4);
}
.node-id {
  font-size: 12px;
  font-weight: 400;
}
.node-block {
  opacity: 0.8;
}
.no-nodes {
  font-size: 12px;
  font-style: italic;
  padding: 8px 12px;
  color: #667eea;
}
/* 部分1 */
.discovering {
  color: #667eea;
}
.refresh-nodes-btn {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
  white-space: nowrap;
}
.refresh-nodes-btn:hover:not(:disabled) {
  background: #5568d4;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
.refresh-nodes-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.refresh-nodes-btn:disabled{
  opacity: 0.5;
  cursor: not-allowed;
}
.controls{
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}
.refresh-btn{
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ;
}
.refresh-btn:hove