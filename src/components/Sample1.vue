<template>
  <div class="questionnaire-container">
    <div class="header-container">
      <div class="status-bar">
        <span>アンケート</span>
        <button @click="loadQuestions('initial')">初回アンケート</button>
        <button @click="loadQuestions('membership')">会員情報アンケート</button>
        <button @click="loadQuestions('withdrawal')">退会アンケート</button>
      </div>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <span class="progress-percentage">{{ Math.round(progressPercentage) }}%</span>
      </div>
    </div>
    
    <Transition name="fade" mode="out-in">
      <div class="main-content" :key="currentQuestionIndex">
        <div class="header-image">
          <!-- アプリアイコンを表示する画像部分 -->
        </div>

        <div 
          class="question-section fixed-header"
          :class="{ 'is-sticky': isSticky }"
          ref="header"
        >
          <p class="question-text">
            {{ questions[currentQuestionIndex].text }}
          </p>
          <p class="sub-text">
            （{{ questions[currentQuestionIndex].type === 'multiple' ? '複数回答可' : questions[currentQuestionIndex].type.startsWith('max') ? `最大${questions[currentQuestionIndex].type.slice(3)}つ` : '単一回答' }}）
          </p>
        </div>

        <div class="content-wrapper"> <!-- 新しいdivを追加 -->
          <div class="options-list">
            <label v-for="(option, index) in questions[currentQuestionIndex].options" :key="index" class="option-item">
              <input
                type="checkbox"
                v-if="questions[currentQuestionIndex].type === 'multiple' || questions[currentQuestionIndex].type.startsWith('max')"
                :disabled="questions[currentQuestionIndex].type.startsWith('max') && selectedOptions.length >= parseInt(questions[currentQuestionIndex].type.slice(3)) && !selectedOptions.includes(option)"
                v-model="selectedOptions"
                :value="option"
                class="custom-checkbox"
              >
              <input
                type="radio"
                v-else
                v-model="selectedOptions"
                :value="option"
                class="custom-radio"
              >
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
          <div class="spacer"></div> <!-- 高さの空白を追加 -->
        </div> 
      </div>
    </Transition>
    <div class="navigation-buttons fixed-footer">
      <button class="back-button" @click="prevQuestion" :disabled="currentQuestionIndex === 0">＜ 戻る</button>
      <button class="next-button" @click="nextQuestion">{{ currentQuestionIndex === questions.length - 1 ? '完了' : '次へ ＞' }}</button>
    </div>
  </div>
</template>

<script>
import { initialQuestions, membershipQuestions, withdrawalQuestions } from '../data/questions';

export default {
  name: 'Sample1',
  data() {
    return {
      currentQuestionIndex: 0,
      questions: initialQuestions,
      selectedOptions: [],
      isSticky: false,
      headerOffset: 0
    }
  },
  computed: {
    progressPercentage() {
      if (this.questions.length === 0) {
        return 0;
      }
      return (this.currentQuestionIndex / this.questions.length) * 100;
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
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedOptions = [];
      } else {
        // 完了処理
        alert('アンケートが完了しました。ご協力ありがとうございました。');
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.selectedOptions = [];
      }
    },
    loadQuestions(type) {
      if (type === 'initial') {
        this.questions = initialQuestions;
      } else if (type === 'membership') {
        this.questions = membershipQuestions;
      } else if (type === 'withdrawal') {
        this.questions = withdrawalQuestions;
      }
      this.currentQuestionIndex = 0;
      this.selectedOptions = [];
    },
    handleScroll() {
      // 現在のスクロール位置がヘッダーの元の位置を超えているかチェック
      this.isSticky = window.pageYOffset > this.headerOffset;
    }
  }
}
</script>

<style scoped>
html, body {
  overflow: auto; /* 変更: overflow:scroll から overflow:auto へ */
}

.questionnaire-container {
  width: 100%;
  min-height: calc(100vh + 40px); /* 変更: ボタン分の高さを追加 */
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: visible; /* 変更: overflow: hidden から overflow: visible へ */
}

.header-container {
  top: 0;
  background-color: white;
  z-index: 10;
}

.status-bar {
  background-color: #0066cc;
  color: white;
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-content {
  flex-grow: 1;
  overflow: hidden;
}

.header-image {
  height: 15vh;
  background-color: #0066cc;
}

.question-section {
  font-size: 16px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 5px;
}

.fixed-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
}

.is-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.highlight-text {
  color: #ff0000;
}

.sub-text {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: right; /* Right aligned */
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto; /* Allow scrolling for options */
  /* max-height: calc(100vh - 60vh); 高さを調整 */
}

.option-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.option-item input {
  margin-right: 10px; /* Add space between input and text */
}

.option-text {
  flex-grow: 1;
  text-align: center; /* Center aligned text */
}

.navigation-buttons {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 10px;
  bottom: 0;
  width: 100%;
  background-color: gray;  
  height: 40px; /* 高さの空白を追加 */
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  z-index: 10;
}

.back-button, .next-button {
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button {
  background-color: #f0f0f0;
  color: #666;
}

.next-button {
  background-color: #0066cc;
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s; /* トランジション時間を1.5秒に変更 */
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.progress-container {
  display: flex;
  align-items: center;
  padding: 5px 30px;
}

.progress-bar {
  flex-grow: 1;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
}

.progress {
  height: 100%;
  background-color: #0066cc;
  transition: width 0.5s;
}

.progress-percentage {
  font-size: 14px;
  color: #666;
}

.question-text {
  font-size: 20px; /* Increased font size */
  margin-bottom: 5px;
}

.custom-checkbox, .custom-radio {
  width: 20px;
  height: 20px;
  margin-right: 10px; /* Add space between input and text */
}

.content-wrapper {
  padding-left: 30px;
  padding-right: 30px;
}

</style>