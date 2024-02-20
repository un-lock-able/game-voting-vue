<script setup>
import { ElMessage } from 'element-plus';

</script>

<script>
export default {
    data() {
        return {
            game_name: "",
            character_list: [],
            participant_info: {
                "invite_code": "",
                "nickname": "",
            },
            votes: {},
        }
    },
    methods: {
        async submitForm() {
            let submit_result = await fetch(
                    '/api/' + this.$route.params.gameId + '/submit/',
                    {
                        method: "POST",
                        body: JSON.stringify({
                            invite_code: this.participant_info.invite_code,
                            nickname: this.participant_info.nickname,
                            votes: this.votes 
                        })
                    }
                ).then((response) => response.json())
            if (!submit_result.success) {
                ElMessage.error("出错力：" + submit_result.message)
            }
            else {
                ElMessage.success("提交成功！")
                this.$router.push('/game/' + this.$route.params.gameId)
            }
        }
    },
    async created() {
        let characters = await fetch('/api/' + this.$route.params.gameId + '/characters/').then((response) => response.json())
        if (characters.success) {
            this.character_list = characters.characters
            this.game_name = characters.game_name
        }
    },
}
</script>

<template>
    <el-container>
        <el-header class="center-header">
            <el-link :underline="false" @click="$router.push('/home')"><div class="header-size">Moe Voting</div></el-link>
        </el-header>
        <el-main>
            <el-page-header @back="$router.back()" class="page-header-margin">
                <template #content> 为{{ game_name }}中的角色投票</template>
            </el-page-header>

            <el-form :inline="true" :model="participant_info">
                <el-form-item
                    label="邀请码"
                    :rules="[
                        {required: true, message: '必须给出邀请码喵'},
                    ]">
                    <el-input v-model="participant_info.invite_code"></el-input>
                </el-form-item>
                <el-form-item
                    label="名字"
                    :rules="[
                        {required: true, message: '起个名字吧！'}
                    ]"
                >
                    <el-input v-model="participant_info.nickname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交！</el-button>
                </el-form-item>
            </el-form>
            
            <el-space wrap>
                <el-card v-for="character in character_list" class="scoring-card">
                    <template #header>{{ character.name }}</template>
                    <el-rate :max="10" show-score v-model="votes[character.id]"></el-rate>
                </el-card>
            </el-space>
        </el-main>
    </el-container>
</template>

<style scoped>
.scoring-card {
    width: 20em;
}
</style>