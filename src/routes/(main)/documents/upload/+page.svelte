<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faFile, faFileImage, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
    let { data, form } = $props();

    let currentFileName = $state("");
    let docsTitle = $state("");
    let previousDocsTitle = "";
    let currentImgName = $state("");
    function updateFileName(e) {
        currentFileName = e.target.value.replace(/^.*[\\\/]/, '');
        previousDocsTitle ||= docsTitle;
        if (!docsTitle || previousDocsTitle == docsTitle) docsTitle = currentFileName;
        previousDocsTitle = currentFileName;
    }
    function updateImgName(e) {
        currentImgName = e.target.value.replace(/^.*[\\\/]/, '');
    }
</script>

<main>
    <form action method="POST" enctype="multipart/form-data">
        <h2>Đăng tài liệu</h2>
        <hr>
        <p>{form?.message}</p>
        <h3><label for="docs-name">Tên tài liệu<sup class="required">*</sup></label></h3>
        <input type="text" name="name" id="docs-name" bind:value={docsTitle} placeholder="Tên của tài liệu">
        <h3><label for="docs-tag">Chọn thẻ cho tài liệu</label></h3>
        <select name="category" id="docs-tag">
            {#each data.cats as cat}
                <option value={cat.id}>{cat.title}</option>
            {/each}
        </select>
        <h3>Tải file lên</h3>
        <div class="file-container">
            <div class="file-wrapper">
                <label class="file" for="docs-thumbnail"><FontAwesomeIcon icon={faFileImage}/> <span>Ảnh bìa<sup class="required">*</sup></span></label>
                <span>{currentImgName}</span>
            </div>
            <div class="file-wrapper">
                <label class="file" for="docs"><FontAwesomeIcon icon={faFile}/> <span>Tài liệu<sup class="required">*</sup></span></label>
                <span>{currentFileName}</span>
            </div>
            <input type="file" name="thumbnail" id="docs-thumbnail" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/tiff,image/svg" hidden required onchange={updateImgName}>
            <input type="file" name="docs" id="docs" accept=".doc,.docx,.pdf,.rtf" hidden required onchange={updateFileName}>
        </div>
        <button type="submit"><FontAwesomeIcon icon={faFileArrowUp}/> Tải lên</button>
    </form>
</main>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: .5rem;
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