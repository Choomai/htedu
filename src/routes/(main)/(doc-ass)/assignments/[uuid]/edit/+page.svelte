<script>
    import { page } from "$app/state";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faFloppyDisk, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
    import { uuidPattern } from "$lib/const";

    let { data } = $props();
    data.questions.forEach(e => e.client_uuid = crypto.randomUUID());
    let questions = $state(data.questions);
    let actionDisabled = $state(false);
    const assignmentUUID = page.params.uuid;

    function addNewQuestion(e) {
        switch (parseInt(e.target.dataset.type)) {
            case 0:
                questions.push({
                    question: "Nội dung câu hỏi",
                    type: 0,
                    client_uuid: crypto.randomUUID(),
                    assignment_uuid: assignmentUUID,
                    data: {
                        "A": "Câu A",
                        "B": "Câu B",
                        "C": "Câu C",
                        "D": "Câu D",
                        "correct": "A"
                    }
                })
                break;
        
            case 1:
                questions.push({
                    question: "Nội dung câu hỏi",
                    type: 1,
                    client_uuid: crypto.randomUUID(),
                    assignment_uuid: assignmentUUID,
                    data: [
                        {"statement": "stmt 1", "answer": false},
                        {"statement": "stmt 2", "answer": true},
                        {"statement": "stmt 3", "answer": true},
                        {"statement": "stmt 4", "answer": false}
                    ]
                })
                break;

            case 2:
                alert("Tính năng đang phát triển!");
                break;
        }
    }

    async function removeQuestion(client_uuid) {
        actionDisabled = true;
        const question = questions.find(question => question.client_uuid == client_uuid);
        if (question.uuid && uuidPattern.test(question.uuid)) {
            try {
                const deleteFetch = await fetch("/api/questions", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ uuid: question.uuid })
                });
                if (deleteFetch.ok) alert("Đã xóa câu hỏi")
            } catch (err) {return alert("Có lỗi xảy ra khi xóa câu hỏi")}
        }
        questions = questions.filter(q => q.client_uuid != client_uuid);
        actionDisabled = false;
    }

    async function submitQuestions(e) {
        actionDisabled = true;
        try {
            const updateFetch = await fetch("/api/questions", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(questions)
            })
            const response = await updateFetch.json();
            if (!response.errors?.length) alert("Đã lưu câu hỏi")
            else throw new Error("Sone rows failed to update");
        } catch (err) {
            console.error(err);
            return alert("Có lỗi xảy ra khi lưu câu hỏi")
        }
        actionDisabled = false;
    }
</script>

<main>
    {#each questions as question, q_index}
        <div class="header">
            <h2>Câu {q_index+1}</h2>
            <button class="fake" type="button" title="Xóa câu hỏi" disabled={actionDisabled} onclick={() => removeQuestion(question.client_uuid)}><FontAwesomeIcon icon={faXmarkCircle} fixedWidth={true}/></button>
        </div>
        {#if question.type == 0}
            <section class="multiple-choice">
                <div class="question">
                    <h3 contenteditable="plaintext-only" bind:innerText={question.question}></h3>
                </div>
                <div class="answers">
                    <input type="radio" name="choice_{q_index}" id="ansA_{q_index}" value="A" hidden 
                        bind:group={question.data.correct}
                        data-index={q_index}>
                    <label for="ansA_{q_index}" contenteditable="plaintext-only" bind:innerText={question.data.A}></label>

                    <input type="radio" name="choice_{q_index}" id="ansB_{q_index}" value="B" hidden 
                        bind:group={question.data.correct}
                        data-index={q_index}>
                    <label for="ansB_{q_index}" contenteditable="plaintext-only" bind:innerText={question.data.B}></label>

                    <input type="radio" name="choice_{q_index}" id="ansC_{q_index}" value="C" hidden 
                        bind:group={question.data.correct}
                        data-index={q_index}>
                    <label for="ansC_{q_index}" contenteditable="plaintext-only" bind:innerText={question.data.C}></label>

                    <input type="radio" name="choice_{q_index}" id="ansD_{q_index}" value="D" hidden 
                        bind:group={question.data.correct}
                        data-index={q_index}>
                    <label for="ansD_{q_index}" contenteditable="plaintext-only" bind:innerText={question.data.D}></label>
                </div>
            </section>
        {:else if question.type == 1}
            <section class="true-false">
                <div class="question">
                    <h3 contenteditable="plaintext-only" bind:innerText={question.question}></h3>
                </div>
                <div class="answers">
                    <h3>Chọn đúng sai</h3>
                    <div class="true-false">
                        <span>Đ</span>
                        <span>S</span>
                    </div>
            
                    {#each question.data as stmt, index}
                        <span contenteditable="plaintext-only" bind:innerText={stmt.statement}></span>
                        <div class="true-false">
                            <input type="radio" name="statement{index}" value="true" 
                                bind:group={stmt.answer}
                                data-index={index}>
                            <input type="radio" name="statement{index}" value="false"
                                bind:group={stmt.answer}
                                data-index={index}>
                        </div>
                    {/each}
                </div>
            </section>
        {/if}
        <hr>
    {/each}
    <h2>Thêm câu hỏi</h2>
    <div class="select-type">
        <button type="button" data-type={0} disabled={actionDisabled} onclick={addNewQuestion}>Trắc nghiệm 4 phương án</button>
        <button type="button" data-type={1} disabled={actionDisabled} onclick={addNewQuestion}>Trắc nghiệm đúng sai</button>
        <button type="button" data-type={2} disabled={actionDisabled} onclick={addNewQuestion}>Tự luận</button>
    </div>
    <button class="save" type="button" disabled={actionDisabled} onclick={submitQuestions}><FontAwesomeIcon icon={faFloppyDisk}/> Lưu thay đổi</button>
</main>

<style>
    main {
        align-self: center;
        width: 100%;
    }
    main > div.header {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }
    main > div.header > button {
        font-size: 1.5rem;
        cursor: pointer;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    div.question {
        background-color: var(--secondary-bg);
        padding: 2rem;
        border-radius: 1rem;
    }

    div.answers {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        width: fit-content;
        gap: 1rem 2rem;
    }

    div.answers > div.true-false {
        display: flex;
        justify-content: space-evenly;
        gap: 1rem;
        width: fit-content;
        font-weight: bold;
        font-size: 1.5rem;
    }
    div.answers > div.true-false > span {
        width: 1.25rem;
        text-align: center;
    }
    section.true-false input[type="radio"] {
        margin: 0;
        width: 1.25rem;
        height: 1.25rem;
    }


    section.multiple-choice > div.answers {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        width: 100%;
    }
    section.multiple-choice label {
        background-color: var(--secondary-bg);
        padding: 2rem;
        border-radius: 1rem;
    }
    section.multiple-choice input[type="radio"]:checked + label {
        background-color: var(--primary-color);
        color: white;
    }

    div.select-type {
        display: flex;
        justify-content: space-evenly;
        gap: 1rem;
    }
    div.select-type button {width: 33.33%;}

    button.save {align-self: flex-end;}
</style>