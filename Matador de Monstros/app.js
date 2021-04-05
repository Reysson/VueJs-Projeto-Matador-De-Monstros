new Vue({
    el: "#app",
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100
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
            this.hurt('playerLife', 7, 10, especial)
            this.hurt('monsterLife', 7, 10, especial)
        },

        hurt(propri, min, max, especial) {
            let plus = especial ? 5 : 0
            let hurt = this.getRandom(min + plus, max + plus)
            this[propri] = Math.max(this[propri] - hurt, 0)
        },

        getRandom(min, max) {
            console.log(min, max)
            let value = Math.random() * (max - min) + min
            return Math.round(value)
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})