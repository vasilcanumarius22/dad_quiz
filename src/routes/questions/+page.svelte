<script lang="ts">
	import QuestionComponent from '../../components/QuestionComponent.svelte';
	import questions from '../../data/questions';
</script>

{#each questions as question, i}
	<div class="container p-2">
		<QuestionComponent index={i} {question} givenAnswears={question.answers} />
	</div>
{/each}
