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
        <el-header><div class="center-header">Moe Voting</div></el-header>
        <el-main>
            <el-table :data="games_list">
                <el-table-column prop="game_name" label="游戏名"></el-table-column>
                <el-table-column prop="last_update_time" label="信息更新时间"></el-table-column>
                <el-table-column label="详细信息">
                    <template #default="scope">
                        <!-- <el-button @click="jumpToDetailOfGame(scope.row.id)">Jump</el-button> -->
                        <el-link @click="jumpToDetailOfGame(scope.row.id)" type="primary">查看</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>