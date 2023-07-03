<script lang="ts">
	import { goto } from '$app/navigation';
	import QuestionComponent from '../components/QuestionComponent.svelte';
	import questions, { type Question } from '../data/questions';

	let selectedQuestions: Question[] = [];

	let currentIndex = 0;

	let selectedAnswers: {
		question: Question;
		answers: string[];
	}[] = [];

	let correctQuestionsNum = 0;
	let totalQuestionsNum = 20;

	let submited = false;

	function getRandomItem() {
		let item: Question | undefined;

		while (!item) {
			let _item = questions[Math.floor(Math.random() * questions.length)];

			if (!selectedQuestions.find((q) => JSON.stringify(q.data) === JSON.stringify(_item.data))) {
				item = _item;
			}
		}

		return item;
	}

	function onStartQuiz() {
		for (let i = 0; i < totalQuestionsNum; i++) {
			selectedQuestions.push(getRandomItem());
		}

		selectedQuestions = selectedQuestions;
	}

	function onSubmitQuiz() {
		for (let sa of selectedAnswers) {
			if (JSON.stringify(sa.question.answers) === JSON.stringify(sa.answers)) {
				correctQuestionsNum += 1;
			}
		}

		submited = true;
	}

	function onNextQuestion(question: Question, _selectedAnswers: string[]) {
		if (selectedAnswers.length === selectedQuestions.length) return;
		currentIndex += 1;

		selectedAnswers.push({
			question,
			answers: _selectedAnswers
		});

		selectedAnswers = selectedAnswers;
	}

	$: question = selectedQuestions[currentIndex];
</script>

{#if selectedQuestions.length <= 0}
	<button on:click={onStartQuiz} class="btn">Start Quiz</button>
{:else if submited}
	<button
		on:click={() => {
			goto('/', {
				invalidateAll: true
			});
		}}
		class="btn">Reset</button
	>

	<p>Correct Questions: {correctQuestionsNum} / {totalQuestionsNum}</p>

	{#each selectedAnswers as sa}
		<QuestionComponent question={sa.question} givenAnswears={sa.answers} />
	{/each}
{:else if !submited}
	{#if selectedAnswers.length !== selectedQuestions.length}
		{currentIndex + 1} / {totalQuestionsNum}
	{/if}

	{#if question !== undefined}
		<QuestionComponent {question} onNext={onNextQuestion} />
	{/if}
	{#if selectedAnswers.length === selectedQuestions.length}
		<button on:click={onSubmitQuiz} class="btn btn-primary">Submit Quiz</button>
	{/if}
{/if}
