<script lang="ts">
    import { onMount } from "svelte";
    import type { IEvent } from "../models/IEvent";
    import { FirebaseEventRepo } from "../repo/FirebaseEventRepo";
    import { showSuccessToast } from "../utils/events-utils";
    let events: IEvent[] = [];
    let eventRepo = new FirebaseEventRepo();
    onMount(async () => {
        events = await eventRepo.ListEvent();
    });

    const deleteObj = async (obj: IEvent) => {
        events = events.filter((e) => e.id !== obj.id);
        await eventRepo.deleteEvent(obj);
        showSuccessToast("Event deleted Successfully!");
    };
</script>

<div class="my-5 pl-5">
    <h3 class="text-2xl text-gray-800 font-bold">List Events</h3>
</div>

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                <th scope="col" class="px-6 py-3"> Title </th>
                <th scope="col" class="px-6 py-3"> Descripton </th>
                <th scope="col" class="px-6 py-3"> Actions </th>
            </tr>
        </thead>
        <tbody>
            {#if events.length === 0}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="text-center py-5" colspan="20"> No Event Added </td>
                </tr>
            {:else}
                {#each events as event}
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {event.title}
                        </th>
                        <td class="px-6 py-4"> {event.descripton.slice(0, 20)}... </td>
                        <td class="px-6 py-4 space-x-2">
                            <a
                                href="list/edit/{event.id}"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >Edit</a
                            >
                            <button
                                on:click={() => deleteObj(event)}
                                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >Remove</button
                            >
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
