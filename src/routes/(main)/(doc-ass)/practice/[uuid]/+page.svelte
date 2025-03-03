<script>
    import { goto } from "$app/navigation";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowLeft, faArrowRight, faCircleCheck, faFileLines, faRepeat } from "@fortawesome/free-solid-svg-icons";
    let { data } = $props();
    let pointer = $state(0);
    data.questions.forEach(question => question.data = typeof question.data === "string" ? JSON.parse(question.data) : question.data);
    let question = $state(data.questions[0]);
    
    // Store answers for all questions
    let answers = $state(data.questions.map(() => ({
        type: null,
        answer: null,
        statements: [null, null, null, null]
    })));
    let inProgress = $state(true);

    function resetSession() {
        answers = data.questions.map(() => ({
            type: null,
            answer: null,
            statements: [null, null, null, null]
        }));
        inProgress = true;
    }

    function changeQuestion(e) {
        pointer += parseInt(e.target.dataset.shift);
        question = data.questions[pointer];
    }
    function handleMultipleChoice() {answers[pointer].type = 0;}
    function handleTrueFalse() {answers[pointer].type = 1;}

    function calcScore() {
        let mcScore = 0;
        let tfScore = 0;
        let maxMcScore = 0;
        let maxTfScore = 0;
        
        data.questions.forEach((q, i) => {
            if (q.type === 0) {
                maxMcScore += 0.25;
                if (answers[i].answer === q.data.correct) {
                    mcScore += 0.25;
                }
            }
            else if (q.type === 1) {
                maxTfScore += 1;
                let correctCount = 0;
                q.data.forEach((stmt, j) => {
                    if (answers[i].statements[j] === stmt.answer.toString()) {
                        correctCount++;
                    }
                });
                
                if (correctCount === 1) tfScore += 0.1;
                else if (correctCount === 2) tfScore += 0.25;
                else if (correctCount === 3) tfScore += 0.5;
                else if (correctCount === 4) tfScore += 1;
            }
        });

        return { 
            mcScore, 
            tfScore, 
            maxMcScore, 
            maxTfScore,
            totalScore: mcScore + tfScore,
            maxTotalScore: maxMcScore + maxTfScore 
        };
    }
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
                <button type="button" onclick={() => inProgress = false}><FontAwesomeIcon icon={faCircleCheck}/> Nộp bài</button>
            {:else}
                <button type="button" data-shift={1} onclick={changeQuestion}><FontAwesomeIcon icon={faArrowRight}/> Câu tiếp theo</button>
            {/if}
        </div>
    {:else}
        <h2>Kết quả</h2>
        {#if calcScore()}
            {@const scores = calcScore()}
            <span>Trắc nghiệm 4 phương án: <code>{(scores.mcScore).toFixed(2)}/{(scores.maxMcScore).toFixed(2)}</code></span>
            <span>Trắc nghiệm đúng sai: <code>{(scores.tfScore).toFixed(2)}/{(scores.maxTfScore).toFixed(2)}</code></span>
            <span>Tổng điểm: <code>{(scores.totalScore).toFixed(2)}/{(scores.maxTotalScore).toFixed(2)}</code></span>
        {/if}
        <div class="action">
            <a href="/practice" class="button"><FontAwesomeIcon icon={faFileLines}/> Luyện đề khác</a>
            <button type="button" onclick={resetSession}><FontAwesomeIcon icon={faRepeat}/> Làm lại</button>
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