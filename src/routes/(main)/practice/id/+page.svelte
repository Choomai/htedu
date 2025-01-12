<script>
    let type = 1;
</script>

<main>
    {#if type == 0}
        <section class="multiple-choice">
            <div class="question">
                <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi iste, eos pariatur quas similique blanditiis tempora asperiores eius nam corporis qui natus voluptatem voluptates voluptatibus cupiditate nemo, dolorum, vero quo.</h3>
            </div>
            <div class="answers">
                <input type="radio" name="choice" id="ansA" hidden>
                <label for="ansA">dasdasdd</label>
                <input type="radio" name="choice" id="ansB" hidden>
                <label for="ansB">12321321fdsfsd</label>
                <input type="radio" name="choice" id="ansC" hidden>
                <label for="ansC">d21312dasgawe21 34rt</label>
                <input type="radio" name="choice" id="ansD" hidden>
                <label for="ansD">dsadi23y5823 weuyf8wsdhfu</label>
            </div>
        </section>
    {:else if type == 1}
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
        
                <span>Stuff</span>
                <div class="true-false">
                    <input type="radio" name="a">
                    <input type="radio" name="a">
                </div>
        
                <span>Real shit?</span>
                <div class="true-false">
                    <input type="radio" name="b">
                    <input type="radio" name="b">
                </div>
        
                <span>lorem dashduigeuihfiurwh dijashfeiquhrquwioh eui</span>
                <div class="true-false">
                    <input type="radio" name="c">
                    <input type="radio" name="c">
                </div>
        
                <span>ipsum</span>
                <div class="true-false">
                    <input type="radio" name="d">
                    <input type="radio" name="d">
                </div>
            </div>
        </section>
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
    div.question > h3 {margin: 0;}

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
</style>