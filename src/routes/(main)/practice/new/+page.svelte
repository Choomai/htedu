<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPlus } from "@fortawesome/free-solid-svg-icons";
</script>

<main>
    <h2>Tạo đề</h2>
    <hr>
    <form action method="post">
        <label for="exam-name">Nhập tên cho đề của bạn</label>
        <input type="text" id="exam-name" name="name" placeholder="Nhập tên" required>
        <label for="multiple-choice">Nhập số câu hỏi trắc nghiệm</label>
        <input type="number" id="multiple-choice" name="multiple-choice" placeholder="Bạn nên nhập số lượng là 24 để bám sát với đề minh họa" required>
        <label for="true-false">Nhập số câu hỏi đúng/sai</label>
        <input type="number" id="true-false" name="true-false" placeholder="Bạn nên nhập số lượng là 2 để bám sát với đề minh họa" required>
        <label for="approach">Nhập số câu hỏi đúng/sai</label>
        <select name="approach" id="approach">
            <option value="khmt">Định hướng khoa học máy tính</option>
            <option value="thud">Định hướng tin học ứng dụng</option>
        </select>
        <input type="number" id="approach-total" placeholder="Bạn nên nhập số lượng là 2 để bám sát với đề minh họa">
        <button type="submit"><FontAwesomeIcon icon={faPlus}/> Tạo đề</button>
    </form>
</main>

<style>
    main {gap: 0;}
    form {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    button {
        align-self: flex-end;
    }
</style>