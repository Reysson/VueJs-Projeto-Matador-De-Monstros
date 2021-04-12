new Vue({
    el: "#app",
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.playerLife = 100
            this.monsterLife = 100
            this.running = true
        },
        attack(especial) {
            this.hurt('playerLife', 7, 10, especial, 'Jogador', 'Monstro', 'player')
            if (this.monsterLife > 0) {
                this.hurt('monsterLife', 7, 10, especial, 'Monstro', 'Jogador', 'monster')
            }

        },

        hurt(propri, min, max, especial, source, target, cls) {
            let plus = especial ? 5 : 0
            let hurt = this.getRandom(min + plus, max + plus)
            this[propri] = Math.max(this[propri] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },

        getRandom(min, max) {
            let value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`o jogador ganhou força de ${heal}`, 'player')
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})