// debug-gui.js
(async () => {
    // dat.GUI 로드
    if (typeof dat === 'undefined') {
        await new Promise(r => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js';
            s.onload = r;
            document.head.appendChild(s);
        });
    }

    const gui = new dat.GUI({ name: 'Pyramid Debug' });
    const settings = {
        power: () => { window.state.prince.power += 1000; },
        speed: 600,
        invincible: false,
        killAll: () => { window.state.enemies = []; }
    };

    gui.add(settings, 'power').name('전투력 +1000');
    gui.add(settings, 'speed', 100, 1000).onChange(v => window.state.prince.speed = v);
    gui.add(settings, 'invincible').name('무적 모드');
    gui.add(settings, 'killAll').name('적 전멸');

    // 게임 루프에 무적 로직 살짝 끼워넣기
    const _upd = window.update;
    window.update = (dt) => {
        if (settings.invincible && window.state.enemies.length > 0) {
            const max = Math.max(...window.state.enemies.map(e => e.power));
            if (window.state.prince.power <= max) window.state.prince.power = max + 10;
        }
        _upd(dt);
    };
})();