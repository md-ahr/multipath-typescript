import Swal from 'sweetalert2';

interface RequiredField {
    playerName?: string;
    factor?: number;
    step?: number;
    isEmpty(): boolean;
    startGame(): void;
    getFormValue(): Array<string | number>;
    calculateScore(): void;
}

class MultimathGame implements RequiredField {

    constructor(public playerName?: string, public factor?: number, public step?: number) {
        this.playerName = playerName;
        this.factor = factor;
        this.step = step;
    }

    getFormValue(): Array<string | number> {
        const playerName: string = (<HTMLInputElement>document.querySelector('#js--player-name')).value;
        const factor: number = parseFloat((<HTMLInputElement>document.querySelector('#js--factor')).value);
        const step: number = parseFloat((<HTMLInputElement>document.querySelector('#js--step')).value);
        return [playerName, factor, step];
    }

    isEmpty(): boolean {
        const playerName = (<HTMLInputElement>document.querySelector('#js--player-name')).value;
        const factor = (<HTMLInputElement>document.querySelector('#js--factor')).value;
        const step = (<HTMLInputElement>document.querySelector('#js--step')).value;
        if (playerName === '' || factor === '' || step === '') {
            return true;
        } else {
            return false;
        }
    }

    startGame(): void {

        const items: Array<string | number> = multimath.getFormValue();
        const factor: string | number = items[1];
        const step: string | number = items[2];
        let content: string = '';

        for (let i: number = 1; i <= step; i++) {
            const index: number = i;
            const answerField = (<HTMLElement>document.querySelector('#js--answer-field'));
            content += `<div class="mt-3">
                            <span id="js--factor">${factor}</span>
                            <span>x</span>
                            <span id="js--step-count">${index}</span>
                            <span>=</span>
                            <input type="text" class="form-control d-inline js--answer" />
                        </div>`;
            answerField.innerHTML = content;
        }

    }

    calculateScore(): void {

        const items: Array<string | number> = this.getFormValue();
        let ansArr: Array<number> = [];
        let ansInputArr: Array<number> = [];
        let res: Array<number> = [];
        const answerInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.js--answer');

        for (let i: number = 1; i <= items[2]; i++) {
            const newFactor: number | string = items[1];
            const newStep: number = i;
            const realAnswer: number = <number>newFactor * newStep;
            ansArr.push(realAnswer);
        }

        answerInput.forEach((item: any) => {
            const customAnswer: number = parseFloat(item.value);
            ansInputArr.push(customAnswer);
        });

        for (let i: number = 0; i < ansArr.length; i++)  {
            if (ansArr[i] === ansInputArr[i]) {
                res.push(ansArr[i]);
                answerInput.forEach((item: any) => {
                    if (ansInputArr[i] == item.value) {
                        item.style.borderColor = '#ddd';
                    }
                });
            } else {
                answerInput.forEach((item: any) => {
                    if (ansInputArr[i] == item.value) {
                        item.style.borderColor = 'red';
                    }
                });
            }
        }

        const correctLength: number = res.length;
        const scoreCard = (<HTMLElement>document.querySelector('#js--score-card'));
        const content: string = `${items[0]} score: correct ${correctLength} out of ${items[2]}`;
        scoreCard.innerHTML = content;

        if (correctLength === items[2]) {
            Swal.fire({
                title: 'Congratulations!'
            });
        }
        
    }
}

const multimath: MultimathGame = new MultimathGame();

const startField: HTMLElement = (<HTMLElement>document.querySelector('#js--btn-start'));

const scoreField: HTMLElement = (<HTMLElement>document.querySelector('#js--btn-score'));

const resetBtn: HTMLElement = (<HTMLElement>document.getElementById('js--btn-reset'));

startField?.addEventListener('click', (): void => {
    let errName: string = '';
    const fileds: Array<HTMLInputElement> = [];
    const nameField = (<HTMLInputElement>document.querySelector('#js--player-name'));
    const factorField: any = (<HTMLInputElement>document.querySelector('#js--factor'));
    const stepField: any = (<HTMLInputElement>document.querySelector('#js--step'));

    fileds.push(nameField, factorField, stepField);

    if (multimath.isEmpty()) {
        const errMessage = (<HTMLElement>document.querySelector('#js--error-message'));
        errMessage.style.display = 'block';
        fileds.forEach((item: any) => {
            if (item.value === '') {
                item.style.borderColor = 'red';
                errName = `<p class="small text-danger pt-1">This field is required</p>`;
                item.nextSibling.remove();
                item.insertAdjacentHTML('afterend', errName);
            } else {
                item.style.borderColor = '#d9d9d9';
                errName = `<p></p>`;
                item.nextSibling.remove();
                item.insertAdjacentHTML('afterend', errName);
            }
        });
        setTimeout(() => {
            errMessage.style.opacity = '1';
        }, 100);
        setTimeout(() => {
            errMessage.style.display = 'none';
        }, 3000);
    } else {
        multimath.startGame();
        const msg = (<HTMLElement>document.querySelector('#js--success-message'));
        msg.style.display = 'block';
        stepField.style.borderColor = '#d9d9d9';
        stepField.nextSibling.remove();
        setTimeout(() => {
            msg.style.opacity = '1';
        }, 100);
        setTimeout(() => {
            msg.style.display = 'none';
        }, 3000);
    }

});

scoreField?.addEventListener('click', (): void => {
    multimath.calculateScore();
});

resetBtn.addEventListener('click', () => {
    location.reload();
});