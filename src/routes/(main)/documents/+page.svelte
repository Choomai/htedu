<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
    import Card from "/src/components/card.svelte";

    let { data } = $props();
    let { docs } = $state(data);

    async function handleDelete(uuid) {
        if (!confirm("Bạn có chắc chắn muốn xóa tài liệu này ?")) return;
        
        const formData = new FormData();
        formData.append("uuid", uuid);
        const deleteReq = await fetch("/api/docs", {
            method: "DELETE",
            body: formData
        });
        if (!deleteReq.ok) return alert("Xoá thất bại, hãy thử lại sau");
        docs = docs.filter(doc => doc.uuid != uuid);
        alert("Xóa tài liệu thành công")
    }
</script>

<main>
    <a href="/documents/upload" class="normalize upload">
        <FontAwesomeIcon icon={faPlusCircle} size="3x"/>
        <span>Đăng tài liệu</span>
    </a>
    <h3>Thư viện của tôi</h3>
    <div class="uploaded">
        {#if docs.length >= 1}
            {#each docs as doc}
                <Card title={doc.name} url="/study-area/{doc.uuid}"
                    imgPath={doc.img_path} tag={doc.category}
                    ondelete={() => handleDelete(doc.uuid)} 
                    username={doc.username} avatar={doc.avatar}/>
            {/each}
        {:else}
            <h2>Không có tài liệu</h2>
        {/if}
    </div>
</main>

<style>
    div.uploaded {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        justify-items: center;
    }

    a.upload {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: revert;
        gap: 1rem;
        font-size: 2rem;
        padding: 1rem;
        border: 1px solid var(--text);
        border-radius: 1rem;
    }
</style>