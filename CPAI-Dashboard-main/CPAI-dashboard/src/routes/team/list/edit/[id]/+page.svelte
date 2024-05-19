<script lang="ts">
    import { page } from "$app/stores";
    import type { ITeam } from "$lib/team/models/ITeam";
    import { FirebaseTeamRepo } from "$lib/team/repo/FirebaseTeamRepo";
    import TeamForm from "$lib/team/ui-components/TeamForm.svelte";
    import { onMount } from "svelte";
    let formData: ITeam;
    let eventRepo = new FirebaseTeamRepo();

    onMount(async () => {
        let data = await eventRepo.getUserById($page.params.id);
        if (data) {
            formData = data;
            
        }
    });
</script>

<TeamForm editCase={true} bind:TeamObj={formData}></TeamForm>
