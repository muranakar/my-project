/* eslint-disable */
<template>
  <div class="questionnaire-container">
    <div class="status-bar">
      <span class="time">11:00</span>
      <span class="title">アンケート</span>
      <div class="battery">
        <span class="battery-level">12%</span>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div class="main-content" :key="currentQuestionIndex">
        <div class="header-image">
          <!-- アプリアイコンを表示する画像部分 -->
        </div>

        <div class="question-section">
          <p class="question-text">
            {{ questions[currentQuestionIndex].text }}
          </p>
          <p class="sub-text">(複数回答可)</p>
        </div>

        <div class="options-list">
          <label v-for="(option, index) in questions[currentQuestionIndex].options" :key="index" class="option-item">
            <input
              type="checkbox"
              v-model="selectedOptions"
              :value="option"
            >
            {{ option }}
          </label>
        </div>

        <div class="navigation-buttons">
          <button class="back-button" @click="prevQuestion" :disabled="currentQuestionIndex === 0">戻る</button>
          <button class="next-button" @click="nextQuestion">{{ currentQuestionIndex === questions.length - 1 ? '完了' : '次へ' }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Sample2',
  data() {
    return {
      currentQuestionIndex: 0,
      questions: [
        {
          text: 'あなたの年齢を教えてください',
          options: ['10代', '20代', '30代', '40代', '50代', '60代以上']
        },
        {
          text: 'あなたの性別を教えてください',
          options: ['男性', '女性', 'その他']
        },
        // ...他の質問を追加...
        {
          text: '当店のサービスに満足していますか？',
          options: ['とても満足', '満足', '普通', '不満', 'とても不満']
        }
      ],
      selectedOptions: []
    }
  },
  methods: {
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        // 完了処理
        alert('アンケートが完了しました。ご協力ありがとうございました。');
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    }
  }
}
</script>

<style scoped>
.questionnaire-container {
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  padding: 20px;
}

.header-image {
  height: 150px;
  background-color: #0066cc;
  margin: -20px -20px 20px -20px;
}

.question-text {
  font-size: 16px;
  margin-bottom: 5px;
}

.highlight-text {
  color: #ff0000;
}

.sub-text {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.back-button, .next-button {
  padding: 10px 20px;
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
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>