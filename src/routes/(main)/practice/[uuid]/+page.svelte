<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowLeft, faArrowRight, faCircleCheck, faFileLines, faRepeat } from "@fortawesome/free-solid-svg-icons";
    let { data } = $props();
    let pointer = $state(0);
    data.questions = typeof data.questions === "string" ? JSON.parse(data.questions) : data.questions;
    let question = $state(data.questions[0]);
    // Store answers for all questions
    let answers = $state(data.questions.map(() => ({
        type: null,
        answer: null,
        statements: [null, null, null, null]
    })));
    let inProgress = $state(true);

    function changeQuestion(e) {
        pointer += parseInt(e.target.dataset.shift);
        question = data.questions[pointer];
    }
    function handleMultipleChoice(e) {answers[pointer].type = 0;}
    function handleTrueFalse(e) {answers[pointer].type = 1;}

    function submitSession(e) {inProgress = false;}
</script>

<main class:done={!inProgress}>
    {#if inProgress}
        {#if question.type == 0}
            <section class="multiple-choice">
                <div class="question">
                    <h3>{question.question}</h3>
                </div>
                <div class="answers">
                    <input type="radio" name="choice_{question.uuid}" id="ansA" value="A" hidden 
                        bind:group={answers[pointer].answer}
                        onchange={handleMultipleChoice}>
                    <label for="ansA">{question.data.A}</label>
                        
                    <input type="radio" name="choice_{question.uuid}" id="ansB" value="B" hidden 
                        bind:group={answers[pointer].answer}
                        onchange={handleMultipleChoice}>
                    <label for="ansB">{question.data.B}</label>
                        
                    <input type="radio" name="choice_{question.uuid}" id="ansC" value="C" hidden 
                        bind:group={answers[pointer].answer}
                        onchange={handleMultipleChoice}>
                    <label for="ansC">{question.data.C}</label>
                        
                    <input type="radio" name="choice_{question.uuid}" id="ansD" value="D" hidden 
                        bind:group={answers[pointer].answer}
                        onchange={handleMultipleChoice}>
                    <label for="ansD">{question.data.D}</label>
                </div>
            </section>
        {:else if question.type == 1}
            <section class="true-false">
                <div class="question">
                    <h3>{question.question}</h3>
                </div>
                <div class="answers">
                    <h3>Chọn đúng sai</h3>
                    <div class="true-false">
                        <span>Đ</span>
                        <span>S</span>
                    </div>
                    
                    {#each question.data as stmt, i}
                    <span>{stmt.statement}</span>
                    <div class="true-false">
                        <input type="radio" name="statement-{i}_{question.uuid}" value="true"
                        bind:group={answers[pointer].statements[i]} onchange={handleTrueFalse}>
                        <input type="radio" name="statement-{i}_{question.uuid}" value="false" 
                        bind:group={answers[pointer].statements[i]} onchange={handleTrueFalse}>
                    </div>
                    {/each}
                </div>
            </section>
            <!-- TODO: Add question with code editor/textarea input. -->
        {/if}
        <div class="action">
            <button type="button" data-shift={-1} disabled={pointer === 0} onclick={changeQuestion}><FontAwesomeIcon icon={faArrowLeft}/> Câu trước đó</button>
            {#if pointer === data.questions.length - 1}
                <button type="button" onclick={submitSession}><FontAwesomeIcon icon={faCircleCheck}/> Nộp bài</button>
            {:else}
                <button type="button" data-shift={1} onclick={changeQuestion}><FontAwesomeIcon icon={faArrowRight}/> Câu tiếp theo</button>
            {/if}
        </div>
    {:else}
        <h2>Kết quả</h2>
        <code>100/100</code>
        <div class="action">
            <button type="button"><FontAwesomeIcon icon={faFileLines}/> Luyện đề khác</button>
            <button type="button"><FontAwesomeIcon icon={faRepeat}/> Làm lại</button>
        </div>
    {/if}
</main>

<style>
    main {
        justify-content: center;
        align-self: center;
        width: 80%;
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

    div.action {
        display: flex;
        justify-content: space-between;
    }

    main.done {
        align-items: center;
        width: 100%;
    }
    main.done div.action {
        gap: 2rem;
    }
</style>