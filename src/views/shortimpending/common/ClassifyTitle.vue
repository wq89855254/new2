<template>
    <div class="classify-title">
        <span>
            <slot></slot>
        </span>
    </div>
</template>
<style lang="scss" scoped>
    .classify-title {
        position: relative;
        border-bottom: 1px solid #e8e8e8;
        color: #1359a1;
        margin-bottom: 5px;
        &>span {
            display: inline-block;
            padding: 5px;
            margin-bottom: -1px;
            border-bottom: 2px solid #1890ff;
        }
    }
</style>
<script>
export default {
    name: 'classify-title'
}
</script>
