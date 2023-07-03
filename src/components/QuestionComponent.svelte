<script lang="ts">
	import { onMount } from 'svelte';
	import type { Question } from '../data/questions';
	export let question: Question;

	export let index: number = 1;
	export let givenAnswears: string[] | undefined = undefined;

	export let onNext: undefined | { (question: Question, selectedAnswers: string[]): void } =
		undefined;

	let answers: string[] = [];

	function onNextQuestion() {
		if (answers.length <= 0) return;

		if (onNext) onNext(question, answers);

		answers = [];

		index +=1;
	}

	$: questionsKeys = Object.keys(question.questions);
</script>

<div class="container card p-2">
	{#key question.data}
		{#if index >= 1}
			{index}.
		{/if}

		{#if question.type === 'IMAGE'}
			<p>{question.data}</p>
			<img src={question.imagePath} style="max-width:20%; height: auto;" alt={question.imagePath} />
		{:else if question.type === 'IMAGEBIG'}
			<p>{question.data}</p>
			<img src={question.imagePath} style="max-width:50%; height: auto;" alt={question.imagePath} />
		{:else if question.type === 'CODE'}
			<p>{question.data}</p>
			<pre>
				{question.code}
			</pre>
		{:else if question.type === 'CODEMULTIPLE'}
			<p>{question.data}</p>
			<pre>
				{question.code}
			</pre>
			<p>{question.data1}</p>
			<pre>
				{question.code1}
			</pre>
			<p>{question.data2}</p>
			
		{:else if question.type === 'TEXT'}
			<p>{question.data}</p>
		{/if}
		<div class="container">
			{#each questionsKeys as option}
				{@const optionData = question.questions[option]}
				<div class="columns">
					<label>
						<input type="checkbox" bind:group={answers} value={option} />
						{option}. {optionData}

						{#if givenAnswears}
							{@const ans = givenAnswears.find((val) => val === option)}

							{#if question.answers.find((q) => q === option)}
								✔️
								{#if ans}
									👈
								{/if}
							{:else if ans}
								❌
							{/if}
						{/if}
					</label>
				</div>
			{/each}
		</div>

		{#if !givenAnswears}
			<button on:click={onNextQuestion} disabled={answers.length <= 0} class="btn btn-primary"
				>Next</button
			>
		{/if}
	{/key}
</div>

<style>
	pre {
		background: #f4f4f4;
		border: 1px solid #ddd;
		border-left: 3px solid #f36d33;
		color: #666;
		page-break-inside: avoid;
		font-family: monospace;
		font-size: 13px;
		line-height: 1.6;
		margin-bottom: 0.5em;
		max-width: 100%;
		overflow: auto;
		padding: 0.5em 0.5em;
		display: block;
		word-wrap: break-word;
	}
</style>
