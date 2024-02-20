<script setup>
</script>

<script>
export default {
    data() {
        return {
            games_list: [],
        }
    },
    methods: {
        jumpToDetailOfGame(target_game_id) {
            this.$router.push("/game/" + target_game_id)
        },
        zeroPad(num) {
            if (num < 10) {
                return '' + 0 + num
            }

            return num
        },
        stringnifyTime(time_string) {
            let time = new Date(time_string)
            return time.getFullYear() + "/" + this.zeroPad(time.getMonth()) + "/" + this.zeroPad(time.getDate()) + " " + this.zeroPad(time.getHours()) + ":" + this.zeroPad(time.getMinutes())
        }
    },
    async created() {
        let games = await fetch('/api/games').then((response) => response.json())
        if (games.success) {
            this.games_list = games.games
        }
    }
}
</script>

<template>
    <el-container>
        <el-header class="center-header">
            <el-link :underline="false" @click="$router.push('/home')"><div class="header-size">Moe Voting</div></el-link>
        </el-header>
        <el-main>
            <el-table
                :data="games_list"
                :default-sort="{prop: 'last_update_time', order: 'descending'}"
                stripe>
                <el-table-column prop="game_name" label="游戏" sortable>
                    <template #default="scope">
                        <el-link @click="jumpToDetailOfGame(scope.row.id)" type="primary">{{ scope.row.game_name }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="last_update_time" label="更新时间" sortable>
                    <template #default="scope">
                        {{ stringnifyTime(scope.row.last_update_time) }}
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>