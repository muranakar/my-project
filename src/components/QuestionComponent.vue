<template>
    <div class="main-content">
        <div class="header-image"></div>
        <div class="question-section fixed-header" :class="{ 'is-sticky': isSticky }" ref="header">
            <p class="question-text">{{ question.text }}</p>
            <p class="sub-text">
                （{{ question.type === 'multiple' ? '複数回答可' :
                    question.type.startsWith('max') ? `最大${question.type.slice(3)}つ` : '単一回答' }}）
            </p>
        </div>
        <div v-if="isSticky" :style="{ height: `${headerHeight}px` }"></div>
        <div class="content-wrapper">
            <div class="options-list">
                <label v-for="(option, index) in question.options" :key="index" class="option-item">
                    <input type="checkbox" v-if="question.type === 'multiple' || question.type.startsWith('max')"
                        :disabled="question.type.startsWith('max') && localSelectedOptions.length >= parseInt(question.type.slice(3)) && !localSelectedOptions.includes(option)"
                        :value="option" class="custom-checkbox" :checked="localSelectedOptions.includes(option)"
                        @change="updateSelection($event, option)">
                    <input type="radio" v-else :value="option" class="custom-radio"
                        :checked="localSelectedOptions.includes(option)" @change="updateSelection($event, option)">
                    <span class="option-text">{{ option }}</span>
                </label>
            </div>
            <div class="spacer"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuestionComponent',
    props: {
        question: Object,
        selectedOptions: Array
    },
    data() {
        return {
            isSticky: false,
            headerHeight: 0,
            localSelectedOptions: [...this.selectedOptions]
        }
    },
    watch: {
        selectedOptions: {
            handler(newOptions) {
                this.localSelectedOptions = [...newOptions];
            },
            deep: true
        }
    },
    mounted() {
        this.headerHeight = this.$refs.header.offsetHeight + 100;
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isSticky = window.pageYOffset > this.$refs.header?.offsetTop;
        },
        updateSelection(event, option) {
            if (event.target.checked) {
                if (this.question.type === 'multiple' || this.question.type.startsWith('max')) {
                    this.localSelectedOptions.push(option);
                } else {
                    this.localSelectedOptions = [option];
                }
            } else {
                this.localSelectedOptions = this.localSelectedOptions.filter(o => o !== option);
            }
            this.$emit('update-options', this.localSelectedOptions);
        }
    }
}
</script>