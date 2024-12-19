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
      <QuestionComponent :question="questions[currentQuestionIndex]"
        :selected-options="answers[currentQuestionIndex] || []" @update-options="updateOptions"
        :key="currentQuestionIndex" />
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
import QuestionComponent from './QuestionComponent.vue';

export default {
  name: 'Sample1',
  components: {
    QuestionComponent
  },
  data() {
    return {
      currentQuestionIndex: 0,
      questions: initialQuestions,
      answers: {},
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
    this.headerOffset = this.$refs.header?.offsetTop;
    this.headerHeight = this.$refs.header.offsetHeight + 100;
    window.addEventListener('scroll', this.handleScroll);
    this.loadQuestions('initial');
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async nextQuestion() {
      if (!this.answers[this.currentQuestionIndex] || this.answers[this.currentQuestionIndex].length === 0) {
        this.showModal = true;
        return;
      }
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        await LocalDatabase.saveAnswers(this.answers);
        this.$router.push({ name: 'Review' });
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
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
      this.answers = {};
      await LocalDatabase.saveQuestions(this.questions);
    },
    handleScroll() {
      this.isSticky = window.pageYOffset > this.headerOffset;
    },
    closeModal() {
      this.showModal = false;
    },
    updateOptions(options) {
      this.answers = { ...this.answers, [this.currentQuestionIndex]: options };
    }
  }
}
</script>