<script>
    let { data } = $props();
    let pointer = $state(0);
    let question = $state(data.questions[0]);
    // Store answers for all questions
    let answers = $state(data.questions.map(() => ({
        type: null,
        answer: null,
        statements: [null, null, null, null]
    })));

    function changeQuestion(e) {
        pointer += parseInt(e.target.dataset.shift);
        question = data.questions[pointer];
    }

    function handleMultipleChoice(e) {
        answers[pointer].type = "multiple_choice";
        answers[pointer].answer = e.target.value;
    }

    function handleTrueFalse(e) {
        const index = parseInt(e.target.dataset.index);
        answers[pointer].type = "true_false";
        answers[pointer].statements[index] = e.target.value === "true";
    }
</script>

<main>
    {#if question.type == "multiple_choice"}
        <section class="multiple-choice">
            <div class="question">
                <h3>{question.question}</h3>
            </div>
            <div class="answers">
                <input type="radio" name="choice" id="ansA" value="A" hidden 
                    checked={answers[pointer].answer === "A"}
                    onchange={handleMultipleChoice}>
                <label for="ansA">{question.answers.A}</label>

                <input type="radio" name="choice" id="ansB" value="B" hidden 
                    checked={answers[pointer].answer === "B"}
                    onchange={handleMultipleChoice}>
                <label for="ansB">{question.answers.B}</label>

                <input type="radio" name="choice" id="ansC" value="C" hidden 
                    checked={answers[pointer].answer === "C"}
                    onchange={handleMultipleChoice}>
                <label for="ansC">{question.answers.C}</label>

                <input type="radio" name="choice" id="ansD" value="D" hidden 
                    checked={answers[pointer].answer === "D"}
                    onchange={handleMultipleChoice}>
                <label for="ansD">{question.answers.D}</label>
            </div>
        </section>
    {:else if question.type == "true_false"}
        <section class="true-false">
            <div class="question">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione repellat maxime excepturi debitis doloremque aliquid, perspiciatis minus ut impedit laudantium natus nisi culpa veritatis, sequi tempore praesentium beatae at.</h3>
            </div>
            <div class="answers">
                <h3>Chọn đúng sai</h3>
                <div class="true-false">
                    <span>Đ</span>
                    <span>S</span>
                </div>
        
                {#each question.statements as statement, i}
                    <span>{statement.statement}</span>
                    <div class="true-false">
                        <input type="radio" name="statement{i}" value="true" 
                            checked={answers[pointer].statements[i] === true}
                            data-index={i} onchange={handleTrueFalse}>
                        <input type="radio" name="statement{i}" value="false" 
                            checked={answers[pointer].statements[i] === false}
                            data-index={i} onchange={handleTrueFalse}>
                    </div>
                {/each}
            </div>
        </section>
    <!-- TODO: Add question with code editor/textarea input. -->
    {/if}
    <div class="action">
        <button class="button" data-shift={-1} disabled={pointer === 0} onclick={changeQuestion}><i class="fa-solid fa-arrow-left"></i> Câu trước đó</button>
        <button class="button" data-shift={1} disabled={pointer === data.questions.length - 1} onclick={changeQuestion}><i class="fa-solid fa-arrow-right"></i> Câu tiếp theo</button>
    </div>
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
</style>