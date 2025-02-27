<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faFile, faFileImage, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
    let { data, form } = $props();

    let currentImgName = $state("");
    function updateImgName(e) {
        currentImgName = e.target.value.replace(/^.*[\\\/]/, '');
    };
</script>

<main>
    <form action method="POST" enctype="multipart/form-data">
        <h2>Đăng bài tập</h2>
        <hr>
        {#if form?.success == false}<p>{form?.message}</p>{/if}
        <label for="ass-name">Tên bài tập<label>
        <input type="text" name="name" id="ass-name" placeholder="Tên của bài tập">
        <label for="ass-tag">Chọn thẻ cho bài tập</label>
        <select name="category" id="ass-tag">
            {#each data.cats as cat}
                <option value={cat.id}>{cat.title}</option>
            {/each}
        </select>
        <div class="file-container">
            <div class="file-wrapper">
                <label class="file" for="ass-thumbnail"><FontAwesomeIcon icon={faFileImage}/> Ảnh bìa</label>
                <span>{currentImgName}</span>
            </div>
            <input type="file" name="thumbnail" id="ass-thumbnail" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/tiff,image/svg" hidden required onchange={updateImgName}>
        </div>
        <button type="submit"><FontAwesomeIcon icon={faFileArrowUp}/> Tải lên</button>
    </form>
</main>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
    div.file-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    div.file-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    button[type="submit"] {
        width: 100%;
        font-weight: bold;
        margin-top: .5rem;
    }
</style>