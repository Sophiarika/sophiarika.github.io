<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "$lib/styles/ties_style.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Ties Seller</title>
    <meta charset="utf-8" />
</svelte:head>

{@render children()}
