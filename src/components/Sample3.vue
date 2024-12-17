<template>
    <div class="container">
      <!-- 通常のコンテンツ -->
      <div class="content">
        <p>スクロール用のコンテンツ</p>
        <p>スクロール用のコンテンツ</p>
      </div>
  
      <!-- 固定したいヘッダー -->
      <div 
        class="sticky-header"
        :class="{ 'is-sticky': isSticky }"
        ref="header"
      >
        固定されるヘッダー
      </div>
  
      <!-- メインコンテンツ -->
      <div class="main-content">
        <p>メインコンテンツ</p>
        <p>メインコンテンツ</p>
      </div>
      <div class="main-content">
        <p>メインコンテンツ</p>
        <p>メインコンテンツ</p>
      </div>
      <div class="main-content">
        <p>メインコンテンツ</p>
        <p>メインコンテンツ</p>
      </div>
      <div class="main-content">
        <p>メインコンテンツ</p>
        <p>メインコンテンツ</p>
      </div>
      <div class="main-content">
        <p>メインコンテンツ</p>
        <p>メインコンテンツ</p>
      </div>
      <div class="main-content">
        <p>メインコンテンツ</p>
        <p>メインコンテンツ</p>
      </div>
      <div class="main-content">
        <p>メインコンテンツ</p>
        <p>メインコンテンツ</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StickyHeader',
    data() {
      return {
        isSticky: false,
        headerOffset: 0
      }
    },
    mounted() {
      // ヘッダーの元の位置を保存
      this.headerOffset = this.$refs.header.offsetTop;
      
      // スクロールイベントリスナーを追加
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      // コンポーネント破棄時にイベントリスナーを削除
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        // 現在のスクロール位置がヘッダーの元の位置を超えているかチェック
        this.isSticky = window.pageYOffset > this.headerOffset;
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    position: relative;
  }
  
  .sticky-header {
    padding: 20px;
    background-color: white;
    border-bottom: 1px solid #eee;
    width: 100%;
    transition: all 0.3s ease;
  }
  
  /* position: sticky を使用した実装 */
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  /* JavaScript を使用した実装の場合 */
  .is-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  
  .main-content {
    padding: 20px;
  }
  </style>