<script>
    let { data } = $props();
    const { doc } = data;
    const url = new URL(doc.path, window.location.origin).toString();
</script>

<main>
    <iframe
        title="Google Docs Viewer"
        src="https://docs.google.com/viewer?url={encodeURIComponent(url)}&embedded=true"
        width="100%"
        height="600px"
        style="border: none;"
    ></iframe>
</main>