<template>
  <div class="table-header">
    <ul class="table-properties">
      <li class="property">Photo</li>
      <li class="property">Character ID</li>
      <li class="property">Name</li>
      <li class="property">Gender</li>
      <li class="property">Species</li>
      <li class="property">LastEpisode</li>
      <li class="property">Add To Favorites</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TableHeader extends Vue {}
</script>

<style>
.table-header {
  background: rgba(229, 234, 244, 0.25);
  height: 54px;
  width: 100vw;
  display: flex;
  align-items: center;
}
.table-properties {
  display: flex;
  width: 100%;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  padding-left: 80px;
  padding-right: 80px;
}
.property {
  color: #a9b1bd;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  width: 134px;
}
@media (max-width: 1100px) {
  .table-header {
    width: 1100px;
  }
  .table-properties {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
