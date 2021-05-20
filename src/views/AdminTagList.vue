<template>
  <v-container class="AdminTagList">
    <h1>Admin Tag List</h1>
    <div class="flex-table">
      <div>Name</div>
      <div>Number of posts</div>
      <div>Actions</div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="flex-table">
      <div>
        <div v-if="tagEditingId === tag.id" class="red--text">
          <v-text-field
            v-model="tag.name"
            :id="`tag-edit-${tag.id}`"
            @blur="updateTagName(tag)"
            @keydown.enter="updateTagName(tag)"
          ></v-text-field>
        </div>
        <div v-else @click="setToEditing(tag)">{{ tag.name }}</div>
      </div>
      <div>
        <router-link :to="{ name: 'tag', params: { id: tag.id } }">
          {{ tag.post_ids.length }}
        </router-link>
      </div>
      <div class="actions">
        <v-btn x-small @click="setToEditing(tag)">Edit</v-btn>
        <v-btn x-small @click="deleteTag(tag)">Delete</v-btn>
      </div>
    </div>
    <div v-if="!isEditingNewTag">
      <v-btn @click="startNewTag()" text>Create Tag</v-btn>
    </div>
    <div v-else>
      <v-text-field
        v-model="newTagName"
        :id="`new-tag-name`"
        @blur="createTag()"
        @keydown.enter="createTag()"
      />
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminTagList",
  data() {
    return {
      tagEditingId: "",
      isEditingNewTag: false,
      newTagName: ""
    };
  },
  computed: {
    ...mapState(["tags"])
  },
  methods: {
    setToEditing(tag) {
      this.tagEditingId = tag.id;
      this.$nextTick(() => {
        document.getElementById(`tag-edit-${tag.id}`).focus();
      });
    },
    async updateTagName(tag) {
      await this.$store.dispatch("updateTagName", { tag });
      this.tagEditingId = "";
    },
    async deleteTag(tag) {
      let confirmed = confirm(
        `Are you sure you want to delete tag ${tag.name}? It is connected to ${tag.post_ids.length} posts.`
      );
      if (confirmed) {
        await this.$store.dispatch("deleteTag", { tag });
      }
    },
    startNewTag() {
      this.isEditingNewTag = true;
      this.$nextTick(() => {
        document.getElementById(`new-tag-name`).focus();
      });
    },
    createTag() {
      if (this.newTagName.length > 0) {
        this.$store.dispatch("createTag", { name: this.newTagName });
        this.newTagName = "";
      }
      this.isEditingNewTag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  padding: 10px;
  border-bottom: 1px black solid;
  &:nth-of-type(2n) {
    background-color: #dedede;
  }
  .actions {
    * {
      margin-left: 8px;
    }
  }
}
</style>
