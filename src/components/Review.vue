
<template>
  <div class="review-container">
    <h1>回答内容の確認</h1>
    <div v-for="(question, index) in questions" :key="index" class="question-review">
      <p class="question-text">{{ question.text }}</p>
      <p class="answer-text">回答: {{ getAnswer(index) }}</p>
    </div>
    <button @click="goBack">戻る</button>
  </div>
</template>

<script>
import LocalDatabase from '../data/LocalDatabase';

export default {
  name: 'Review',
  data() {
    return {
      questions: [],
      answers: []
    }
  },
  async mounted() {
    this.questions = await LocalDatabase.getQuestions();
    this.answers = await LocalDatabase.getAnswers();
  },
  methods: {
    getAnswer(index) {
      const answer = this.answers.find(a => a.questionIndex === index);
      return answer ? answer.answers.join(', ') : '未回答';
    },
    goBack() {
      this.$router.push({ name: 'Sample1' });
    }
  }
}
</script>

<style scoped>
.review-container {
  padding: 20px;
}

.question-review {
  margin-bottom: 20px;
}

.question-text {
  font-weight: bold;
}

.answer-text {
  margin-left: 10px;
}
</style>