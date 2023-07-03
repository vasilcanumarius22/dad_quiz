<script lang="ts">
	import QuestionComponent from '../../components/QuestionComponent.svelte';
	import questions from '../../data/questions';
</script>

{#each questions as question, i}
	<div class="container p-2">
		<QuestionComponent index={i+1} {question} givenAnswears={question.answers} />
	</div>
{/each}
