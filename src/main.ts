export class Main {
    private swapper = document.querySelector<HTMLElement>('.button-swapper')!;
    private altoContraste = document.querySelector<HTMLElement>('.button-alto-contraste')!;
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
            }
        );

    }

    setTheme(): void {

    }

}

new Main();