<script lang="ts">
    import { goto } from "$app/navigation";
    import type { IEvent } from "../models/IEvent";
    import { FirebaseEventRepo } from "../repo/FirebaseEventRepo";
    import { showErrorToast, showSuccessToast } from "../utils/events-utils";
    import ImageUploader from "./ImageUploader.svelte";
    export let editCase: boolean = false;
    export let eventObj: IEvent = {
        id: "",
        title: "",
        image: "",
        descripton: "",
    };
    let loading: boolean = false;

    const handleSave = async () => {
        let repo = new FirebaseEventRepo();
        loading = true;

        if (isFile(eventObj.image)) {
            eventObj.image = await repo.imageToUrl(
                eventObj.title,
                eventObj.image as unknown as File
            );
        }

        try {
            if (editCase) {
                await repo.updateEvent(eventObj);
            } else {
                await repo.saveEvent(eventObj);
            }
            showSuccessToast(`Event ${editCase ? "Updated" : "Saved"} Successfully!`);
            goto('/event/list')
        } catch (e) {
            console.log(e);
            showErrorToast("something went wrong!");
        }
        loading = false;
    };

    function isFile(input: string | Blob): boolean {
        if (typeof input === "string") {
            // Assuming it's a file path
            return false; // As we can't directly check if a string is a file
        } else {
            // Blob object
            return true;
        }
    }
</script>

<div class="my-5 pl-5">
    <h3 class="text-2xl text-gray-800 font-bold">Add Event</h3>
</div>
<div class="max-w-md mx-auto mt-14">
    <div class="relative z-0 w-full mb-5 group">
        <input
            type="text"
            name="floating_email"
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-gray-900 peer"
            placeholder=" "
            bind:value={eventObj.title}
        />
        <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-bborder-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Title</label
        >
    </div>

    <div class="relative z-0 w-full mb-5 group">
        <textarea
            name="desc"
            id="desc"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-gray-900 peer"
            placeholder=" "
            bind:value={eventObj.descripton}
        />
        <label
            for="desc"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-bborder-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Description</label
        >
    </div>

    <ImageUploader bind:imageUrl={eventObj.image}></ImageUploader>
    <div class="flex justify-end w-full">
        <button
            on:click={handleSave}
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
            >{loading ? "Loading.." : "Submit"}</button
        >
    </div>
</div>
