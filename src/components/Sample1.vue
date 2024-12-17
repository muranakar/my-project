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
        </div>
        <div class="question-section fixed-header" :class="{ 'is-sticky': isSticky }" ref="header">
          <p class="question-text">
            {{ questions[currentQuestionIndex].text }}
          </p>
          <p class="sub-text">
            （{{ questions[currentQuestionIndex].type === 'multiple' ? '複数回答可' :
              questions[currentQuestionIndex].type.startsWith('max') ?
                `最大${questions[currentQuestionIndex].type.slice(3)}つ` : '単一回答' }}）
          </p>
        </div>
        <div v-if="isSticky" :style="{ height: `${headerHeight}px` }"></div>

        <div class="content-wrapper">
          <div class="options-list">
            <label v-for="(option, index) in questions[currentQuestionIndex].options" :key="index" class="option-item">
              <input type="checkbox"
                v-if="questions[currentQuestionIndex].type === 'multiple' || questions[currentQuestionIndex].type.startsWith('max')"
                :disabled="questions[currentQuestionIndex].type.startsWith('max') && selectedOptions.length >= parseInt(questions[currentQuestionIndex].type.slice(3)) && !selectedOptions.includes(option)"
                v-model="selectedOptions" :value="option" class="custom-checkbox">
              <input type="radio" v-else v-model="selectedOptions" :value="option" class="custom-radio">
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
          <div class="spacer"></div>
        </div>
      </div>
    </Transition>
    <div class="navigation-buttons fixed-footer">
      <button class="back-button" @click="prevQuestion" :disabled="currentQuestionIndex === 0">＜ 戻る</button>
      <button class="next-button" @click="nextQuestion">{{ currentQuestionIndex === questions.length - 1 ? '完了' : '次へ ＞'
        }}</button>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>回答をお願いいたします🙇</p>
        <button @click="closeModal">閉じる</button>
      </div>
    </div>
  </div>
</template>

<script>
import { initialQuestions, membershipQuestions, withdrawalQuestions } from '../data/questions';
import LocalDatabase from '../data/LocalDatabase';

export default {
  name: 'Sample1',
  data() {
    return {
      currentQuestionIndex: 0,
      questions: initialQuestions,
      selectedOptions: [],
      isSticky: false,
      headerOffset: 0,
      headerHeight: 0,
      showModal: false
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
  async mounted() {
    await LocalDatabase.init();
    this.headerOffset = this.$refs.header.offsetTop;
    this.headerHeight = this.$refs.header.offsetHeight + 100;
    window.addEventListener('scroll', this.handleScroll);
    this.loadQuestions('initial');
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async nextQuestion() {
      if (this.selectedOptions.length === 0) {
        this.showModal = true;
        return;
      }
      await LocalDatabase.saveAnswers([{ questionIndex: this.currentQuestionIndex, answers: this.selectedOptions }]);
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedOptions = [];
      } else {
        this.$router.push({ name: 'Review' });
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.selectedOptions = [];
      }
    },
    async loadQuestions(type) {
      if (type === 'initial') {
        this.questions = initialQuestions;
      } else if (type === 'membership') {
        this.questions = membershipQuestions;
      } else if (type === 'withdrawal') {
        this.questions = withdrawalQuestions;
      }
      this.currentQuestionIndex = 0;
      this.selectedOptions = [];
      await LocalDatabase.saveQuestions(this.questions);
    },
    handleScroll() {
      this.isSticky = window.pageYOffset > this.headerOffset;
    },
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>