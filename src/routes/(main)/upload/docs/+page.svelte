<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faFile, faFileImage } from "@fortawesome/free-solid-svg-icons";
    let { data } = $props();

    let currentFileName = $state("");
    let currentImgName = $state("");
    function updateFileName(e) {
        currentFileName = e.target.value.replace(/^.*[\\\/]/, '');
    }
    function updateImgName(e) {
        currentImgName = e.target.value.replace(/^.*[\\\/]/, '');
    }
</script>

<main>
    <form action method="POST" enctype="multipart/form-data">
        <label for="docs-name">Tên tài liệu</label>
        <input type="text" name="name" id="docs-name" placeholder="Tên của tài liệu">
        <label for="docs-tag">Chọn thẻ cho tài liệu</label>
        <select name="tag" id="docs-tag">
            {#each data.cats as cat}
                <option value={cat.id}>{cat.title}</option>
            {/each}
        </select>
        <h3>Tải file lên</h3>
        <div class="file-container">
            <div class="file-wrapper">
                <label class="file" for="docs-thumbnail"><FontAwesomeIcon icon={faFileImage}/> Ảnh bìa</label>
                <span>{currentImgName}</span>
            </div>
            <div class="file-wrapper">
                <label class="file" for="docs"><FontAwesomeIcon icon={faFile}/> Tài liệu</label>
                <span>{currentFileName}</span>
            </div>
            <input type="file" name="thumbnail" id="docs-thumbnail" accept="image/*" hidden onchange={updateImgName}>
            <input type="file" name="docs" id="docs" accept=".doc,.docx,.pdf,.rtf" hidden onchange={updateFileName}>
        </div>
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
</style>