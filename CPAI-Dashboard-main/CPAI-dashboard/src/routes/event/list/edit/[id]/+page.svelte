<script lang="ts">
    import { page } from "$app/stores";
    import type { IEvent } from "$lib/events/models/IEvent";
    import { FirebaseEventRepo } from "$lib/events/repo/FirebaseEventRepo";
    import EventForm from "$lib/events/ui-components/EventForm.svelte";
    import { onMount } from "svelte";
    let formData: IEvent;
    let eventRepo = new FirebaseEventRepo();

    onMount(async () => {
        let data = await eventRepo.getUserById($page.params.id);
        if (data) {
            formData = data;
            console.log(formData);
            
        }
    });
</script>

<EventForm editCase={true} bind:eventObj={formData}></EventForm>
