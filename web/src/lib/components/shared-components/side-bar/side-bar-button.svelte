<script lang="ts">
	import type Icon from 'svelte-material-icons/AbTesting.svelte';

	export let title: string;
	export let logo: typeof Icon;
	export let isSelected: boolean;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const onButtonClicked = () => dispatch('selected');
</script>

<div
	on:click={onButtonClicked}
	on:keydown={onButtonClicked}
	class={`flex gap-4 place-items-center pl-5 py-3 rounded-tr-full rounded-br-full hover:bg-immich-gray dark:hover:bg-immich-dark-gray hover:text-immich-primary dark:text-immich-dark-fg dark:hover:text-immich-dark-primary hover:cursor-pointer
    ${
			isSelected &&
			'bg-immich-primary/10 dark:bg-immich-dark-primary/10 text-immich-primary dark:text-[#adcbfa] hover:bg-immich-primary/25'
		}
  `}
>
	<svelte:component this={logo} size="24" />
	<p class="font-medium text-sm ">{title}</p>
</div>
