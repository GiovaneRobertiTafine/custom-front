export class Main {
    private swapper = document.querySelector<HTMLElement>('.button-swapper')!;
    private altoContraste = document.querySelector<HTMLElement>('.button-alto-contraste')!;
    private fonteMais = document.querySelector<HTMLElement>('#btn-fonte-mais')!;
    private fonteMenos = document.querySelector<HTMLElement>('#btn-fonte-menos')!;
    private lastMode = '';

    constructor() {
        console.log(localStorage.getItem('data-theme'));
        const currentTheme = localStorage.getItem('data-theme') !== null ? localStorage.getItem('data-theme') : '';
        const currentSwapperTheme = localStorage.getItem('data-swapper-theme') !== null ? localStorage.getItem('data-swapper-theme') : '';
        const currentSwapperThemeRotate = localStorage.getItem('data-swapper-rotate') !== null ? localStorage.getItem('data-swapper-rotate') : '';

        document.documentElement.setAttribute('data-theme', currentTheme!);
        document.documentElement.setAttribute('data-swapper-theme', currentSwapperTheme!);
        document.documentElement.setAttribute('data-swapper-rotate', currentSwapperThemeRotate!);

        console.log(document.documentElement.getAttribute('data-theme'));
        console.log(document.documentElement.getAttribute('data-swapper-theme'));
        this.modeViewEventListener();
    }

    modeViewEventListener(): void {
        this.fontSizeBody = '100';
        this.changeFonte();
        this.swapper.addEventListener(
            'click', () => {
                console.log(document.documentElement.getAttribute('data-theme'));
                if (document.documentElement.getAttribute('data-theme') === 'ALTO_CONTRASTE') {
                    document.documentElement.setAttribute('data-theme', localStorage.getItem('data-swapper-theme')!);
                    document.documentElement.setAttribute('data-swapper-theme', localStorage.getItem('data-swapper-theme')!);
                    document.documentElement.setAttribute('data-swapper-rotate', localStorage.getItem('data-swapper-rotate')!);
                } else if (document.documentElement.getAttribute('data-theme') === 'DARK') {
                    document.documentElement.setAttribute('data-theme', '');
                    document.documentElement.setAttribute('data-swapper-theme', '');
                    document.documentElement.setAttribute('data-swapper-rotate', '');
                } else if (document.documentElement.getAttribute('data-theme') === '') {
                    document.documentElement.setAttribute('data-theme', 'DARK');
                    document.documentElement.setAttribute('data-swapper-theme', 'DARK');
                    document.documentElement.setAttribute('data-swapper-rotate', 'DARK');
                }
                localStorage.setItem('data-theme', document.documentElement.getAttribute('data-theme')!);
                localStorage.setItem('data-swapper-theme', document.documentElement.getAttribute('data-swapper-theme')!);
                localStorage.setItem('data-swapper-rotate', document.documentElement.getAttribute('data-swapper-rotate')!);
                this.lastMode = '';
                this.changeFonte();
            }
        );
        this.altoContraste.addEventListener(
            'click', () => {
                if (document.documentElement.getAttribute('data-theme') !== 'ALTO_CONTRASTE') {
                    document.documentElement.setAttribute('data-theme', 'ALTO_CONTRASTE');
                } else {
                    document.documentElement.setAttribute('data-theme', localStorage.getItem('data-swapper-theme')!);
                    document.documentElement.setAttribute('data-swapper-theme', localStorage.getItem('data-swapper-theme')!);
                }
                localStorage.setItem('data-theme', document.documentElement.getAttribute('data-theme')!);
                localStorage.setItem('data-swapper-theme', document.documentElement.getAttribute('data-swapper-theme')!);
                this.changeFonte();
            }
        );
        this.fonteMais.addEventListener(
            'click', () => {
                this.changeFonte('mais');
            }
        );
        this.fonteMenos.addEventListener(
            'click', () => {
                this.changeFonte('menos');
            }
        );
    }

    changeFonte(param?: 'mais' | 'menos'): void {
        if (param) {
            if (param === 'mais' && this.fontSizeBody !== '24px') {
                this.fontSizeBody = (+this.fontSizeBody.substring(0, 2) + 4) + 'px';
            } else if (param === 'menos' && this.fontSizeBody !== '16px') {
                this.fontSizeBody = (+this.fontSizeBody.substring(0, 2) - 4) + 'px';
            }
        }
        if (this.fontSizeBody === '16px') {
            (this.fonteMenos as HTMLBodyElement).style.color = getComputedStyle(document.body).getPropertyValue('--font-disabled');
        } else {
            (this.fonteMenos as HTMLBodyElement).style.color = getComputedStyle(document.body).getPropertyValue('--font-color');
        };
        if (this.fontSizeBody === '24px') {
            (this.fonteMais as HTMLBodyElement).style.color = getComputedStyle(document.body).getPropertyValue('--font-disabled');
        } else {
            (this.fonteMais as HTMLBodyElement).style.color = getComputedStyle(document.body).getPropertyValue('--font-color');
        };
    }

    get fontSizeBody(): string { return getComputedStyle(document.querySelector('body')!).fontSize; }
    set fontSizeBody(newValue: string) { (document.querySelector('body') as HTMLBodyElement).style.fontSize = newValue; }
}

new Main();