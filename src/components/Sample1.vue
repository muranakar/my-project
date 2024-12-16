<template>
  <div class="questionnaire-container">
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

    <transition name="fade" mode="out-in">
      <div class="main-content" :key="currentQuestionIndex">
        <div class="header-image">
          <!-- アプリアイコンを表示する画像部分 -->
        </div>

        <div class="question-section">
          <p class="question-text">
            {{ questions[currentQuestionIndex].text }}
          </p>
          <p class="sub-text">
            {{ questions[currentQuestionIndex].type === 'multiple' ? '複数回答可' : questions[currentQuestionIndex].type.startsWith('max') ? `最大${questions[currentQuestionIndex].type.slice(3)}つ` : '単一回答' }}
          </p>
        </div>

        <div class="options-list">
          <label v-for="(option, index) in questions[currentQuestionIndex].options" :key="index" class="option-item">
            <input
              type="checkbox"
              v-if="questions[currentQuestionIndex].type === 'multiple' || questions[currentQuestionIndex].type.startsWith('max')"
              :disabled="questions[currentQuestionIndex].type.startsWith('max') && selectedOptions.length >= parseInt(questions[currentQuestionIndex].type.slice(3)) && !selectedOptions.includes(option)"
              v-model="selectedOptions"
              :value="option"
            >
            <input
              type="radio"
              v-else
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
import { initialQuestions, membershipQuestions, withdrawalQuestions } from '../data/questions';

export default {
  name: 'Sample1',
  data() {
    return {
      currentQuestionIndex: 0,
      questions: initialQuestions,
      selectedOptions: []
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
    }
  }
}
</script>

<style scoped>
html, body {
  overflow: hidden;
}

.questionnaire-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
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
  padding: 20px;
  overflow-y: auto;
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

.progress-container {
  display: flex;
  align-items: center;
  margin: 10px 0;
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
</style>