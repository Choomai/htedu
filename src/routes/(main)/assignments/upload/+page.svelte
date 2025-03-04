<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faFileImage, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
    let { data, form } = $props();
    console.log(form);

    let currentImgName = $state("");
    function updateImgName(e) {
        currentImgName = e.target.value.replace(/^.*[\\\/]/, '');
    };
</script>

<main>
    <form action method="POST" enctype="multipart/form-data">
        <h2>Đăng bài tập</h2>
        <hr>
        <p>{form?.message}</p>
        <label for="ass-title">Tên bài tập<sup class="required">*</sup></label>
        <input type="text" name="title" id="ass-title" placeholder="Tên của bài tập">
        <div class="wrapper">
            <div class="cats-wrapper">
                <label for="ass-tag">Chọn thẻ cho bài tập</label>
                <select name="category" id="ass-tag">
                    {#each data.cats as cat}
                        <option value={cat.id}>{cat.title}</option>
                    {/each}
                </select>
            </div>
            <div class="file-wrapper">
                <label class="file" for="ass-thumbnail"><FontAwesomeIcon icon={faFileImage}/> Ảnh bìa</label>
                <span>{currentImgName}</span>
                <input type="file" name="thumbnail" id="ass-thumbnail" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/tiff,image/svg" hidden onchange={updateImgName}>
            </div>
        </div>
        <button type="submit"><FontAwesomeIcon icon={faFileArrowUp}/> Tải lên</button>
    </form>
</main>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
    div.wrapper {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: .5rem;
    }
    div.cats-wrapper > select {
        padding: .5rem;
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