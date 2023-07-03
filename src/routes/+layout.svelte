<script lang="ts">
</script>

<svelte:head>
	<title>Quiz Tester</title>
	<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
	<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css" />
	<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
	<link
		rel="stylesheet"
		href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
	/>
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
</svelte:head>

<div class="container">
	<header class="navbar">
		<nav class="navbar-section" data-sveltekit-reload>
			<a href="/" class="navbar-brand mr-2">Quiz Tester</a>
			<a href="/" class="btn btn-link">Start Quiz</a>
			<a href="/questions" class="btn btn-link">Possible Questions</a>
		</nav>
	</header>

	<div class="container">
		<slot />
	</div>
</div>
