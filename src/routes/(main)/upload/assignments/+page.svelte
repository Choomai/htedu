<script>
    let { data } = $props();
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
        <label for="docs-thumbnail">Ảnh bìa</label>
        <input type="file" name="thumbnail" id="docs-thumbnail" accept="image/*">
        <label for="docs">Tài liệu</label>
        <input type="file" name="docs" id="docs" accept=".doc,.docx,.pdf,.rtf">
    </form>
</main>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
</style>