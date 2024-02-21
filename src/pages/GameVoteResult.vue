<script setup>
</script>

<script>
export default {
    data() {
        return {
            scores_list: [],
            character_list: [],
            game_name: "",
        }
    },
    methods: {
        getScore(row, column) {
            var result = row.scores[column.property]
            if (typeof(result) === 'undefined'){
                return '-'
            }
            return result
        },
        jumpToVote() {
            this.$router.push("/game/" + this.$route.params.gameId + '/vote')
        }
    },
    async created() {
        let scores = await fetch('/back/api/' + this.$route.params.gameId + '/result/').then((response) => response.json())
        if (scores.success) {
            this.scores_list = scores.vote_result
        }

        let characters = await fetch('/back/api/' + this.$route.params.gameId + '/characters/').then((response) => response.json())
        if (characters.success) {
            this.character_list = characters.characters
            this.game_name = characters.game_name
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
            <el-page-header @back="$router.push('/home')" class="page-header-margin">
                <template #content>{{ game_name }}</template>
                <template #extra>
                    <el-link type="primary" :underlin="false" @click="jumpToVote">前往投票！</el-link>
                </template>
            </el-page-header>
            <el-table :data="scores_list" stripe>
                <el-table-column prop="participant_name" label="" fixed resizable min-width="100">
                </el-table-column>
                <el-table-column v-for="character in character_list" :label="character.name" :prop="character.name" :formatter="getScore" min-width="100">
                    <template #header="scope">
                        <div class="no-text-wrap">
                            {{ scope.column.property }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<style scoped>
</style>