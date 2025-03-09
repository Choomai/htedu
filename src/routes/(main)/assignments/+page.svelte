<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
    import Card from "/src/components/card.svelte";

    let { data } = $props();
    let { assignments } = $state(data);

    async function handleDelete(uuid) {
        if (!confirm("Bạn có chắc chắn muốn xóa bài tập này ?")) return;
        
        const formData = new FormData();
        formData.append("uuid", uuid);
        const deleteReq = await fetch("/api/assignments", {
            method: "DELETE",
            body: formData
        });
        if (!deleteReq.ok) return alert("Xoá thất bại, hãy thử lại sau");
        assignments = assignments.filter(ass => ass.uuid != uuid);
        alert("Xóa bài tập thành công")
    }
</script>

<main>
    <a href="/assignments/upload" class="normalize upload">
        <FontAwesomeIcon icon={faPlusCircle} size="3x"/>
        <span>Đăng bài tập</span>
    </a>
    <h3>Thư viện của tôi</h3>
    <div class="uploaded">
        {#each assignments as ass}
            <Card title={ass.title} url="/practice/{ass.uuid}" imgPath={ass.img_path} 
                editUrl="/assignments/{ass.uuid}/edit"
                ondelete={() => handleDelete(ass.uuid)}
                username={ass.username} avatar={ass.avatar}/>
        {/each}
    </div>
</main>

<style>
    div.uploaded {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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